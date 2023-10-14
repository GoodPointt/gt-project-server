const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { parse, isValid } = require('date-fns');

const { handleMongooseError } = require('../utils');

const priorities = ['low', 'medium', 'high'];
const categories = ['to-do', 'in progress', 'done'];
const dateFormats = {
  day: 'HH:mm',
  year: 'yyyy-MM-dd',
};

const tasksSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [250, 'Title must not exceed 250 characters'],
    },
    start: {
      type: String,
      required: [true, 'Start date is required'],
      validate: {
        validator: function (date) {
          const parsedDate = parse(date, 'HH:mm', new Date());
          return isValid(parsedDate);
        },
        message: "Invalid start time format. Use HH:mm (e.g., '09:00').",
      },
    },
    end: {
      type: String,
      required: [true, 'End date is required'],
      validate: [
        {
          validator: function (date) {
            const parsedDate = parse(date, 'HH:mm', new Date());
            return isValid(parsedDate);
          },
          message: "Invalid start time format. Use HH:mm (e.g., '09:00').",
        },
        {
          validator: function (date) {
            const parsedDate = parse(date, 'HH:mm', new Date());
            const parsedStart = parse(this.start, 'HH:mm', new Date());
            return parsedDate > parsedStart;
          },
          message: 'End time cannot be smaller than start time.',
        },
      ],
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      default: 'low',
      enum: { values: priorities, message: '{VALUE} is not supported' },
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      validate: {
        validator: function (date) {
          const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
          return isValid(parsedDate);
        },
        message: "Invalid date format.  Use HH:mm (e.g., '2023-01-01').",
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'to-do',
      enum: { values: categories, message: '{VALUE} is not supported' },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

tasksSchema.post('save', handleMongooseError);

const Task = model('task', tasksSchema);

const taskJoiSchema = Joi.object({
  title: Joi.string().required().max(250),
  start: Joi.string().required(),
  end: Joi.string().required(),
  priority: Joi.string()
    .required()
    .valid('low', 'medium', 'high')
    .default('low')
    .messages({
      'any.only': `{#label} !must be one of "low", "medium" or "high", but got "{#value}"`,
    }),
  date: Joi.string().required(),

  category: Joi.string()
    .required()
    .valid('to-do', 'in progress', 'done')
    .default('to-do')
    .messages({
      'any.only': `{#label} !must be one of "to-do", "in-progress", or "done", but got "{#value}"`,
    }),
})
  .custom((value, helper) => {
    const { start, end, date } = value;

    const parsedStart = parse(start, dateFormats.day, new Date());

    if (!isValid(parsedStart)) {
      return helper.message(
        `Invalid start time format ${start}. Use HH:mm (e.g., '09:00').`
      );
    }

    const parsedEnd = parse(end, dateFormats.day, new Date());
    if (!isValid(parsedEnd)) {
      return helper.message(
        `Invalid start time format ${end}. Use HH:mm (e.g., '09:00').`
      );
    }
    if (parsedEnd <= parsedStart) {
      return helper.message(
        `End time ${end} must be later than start time ${start}.`
      );
    }

    const parsedDate = parse(date, dateFormats.year, new Date());
    if (!isValid(parsedDate)) {
      return helper.message(
        `Invalid date format ${date}.  Use yyyy-MM-dd (e.g., '2023-01-01').`
      );
    }
  })
  .messages({
    'string.base': `{#label} !should be a type of 'text'`,
    'string.empty': `{#label} !cannot be an empty field`,
    'any.required': `{#label} !is a required field`,
    'string.max': `{#label} !should have a maximum length of {#limit}`,
  });

module.exports = {
  Task,
  taskJoiSchema,
};
