const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { parse, isValid } = require('date-fns');

const { handleMongooseError } = require('../utils');

const priorities = ['low', 'medium', 'high'];
const categories = ['to-do', 'in progress', 'done'];

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
  title: Joi.string().required().max(250).messages({
    'string.base': `"title" !should be a type of 'text'`,
    'string.empty': `"title" !cannot be an empty field`,
    'string.max': `"title" !should have a maximum length of {#limit}`,
    'any.required': `"title" !is a required field`,
  }),
  end: Joi.string()
    .required()
    .custom((date, helper) => {
      const parsedDate = parse(date, 'HH:mm', new Date());
      if (!isValid(parsedDate)) {
        return helper.message(
          "Invalid start time format. Use HH:mm (e.g., '09:00')."
        );
      }
      const { start } = helper.state.ancestors[0];

      const startValue = parse(start, 'HH:mm', new Date());
      if (parsedDate <= startValue) {
        return helper.message('End time cannot be smaller than start time.');
      }
    }),
  start: Joi.string()
    .required()
    .custom((date, helper) => {
      const parsedDate = parse(date, 'HH:mm', new Date());
      if (!isValid(parsedDate)) {
        return helper.message(
          "Invalid start time format. Use HH:mm (e.g., '09:00')."
        );
      }
    })
    .messages({
      'string.base': `"start" !should be a type of 'text'`,
      'string.empty': `"start" !cannot be an empty field`,
      'any.required': `"start" !is a required field`,
    }),
  priority: Joi.string().required().valid('low', 'medium', 'high').messages({
    'string.base': `"priority" !should be a type of 'text'`,
    'string.empty': `"priority" !cannot be an empty field`,
    'any.required': `"priority" !is a required field`,
    'any.only': `"priority" !must be one of "low", "medium", or "high"`,
  }),
  date: Joi.string()
    .required()
    .custom((date, helper) => {
      const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
      if (!isValid(parsedDate)) {
        return helper.message(
          "Invalid date format.  Use yyyy-MM-dd (e.g., '2023-01-01')."
        );
      }
    }),
  category: Joi.string()
    .required()
    .valid('to-do', 'in progress', 'done')
    .messages({
      'string.base': `"category" !should be a type of 'text'`,
      'string.empty': `"category" !cannot be an empty field`,
      'any.required': `"category" !is a required field`,
      'any.only': `"category" !must be one of "to-do", "in-progress", or "done"`,
    }),
});

module.exports = {
  Task,
  taskJoiSchema,
};
