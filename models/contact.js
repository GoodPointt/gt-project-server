const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../utils');

const categories = ['none', 'family', 'friends', 'work'];
const phoneRegexp = /^[0-9\s+()-]+$/;
const emailRegexp =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: 'none',
      enum: categories,
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

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
  category: Joi.string().valid(...categories),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateCategoryJoiSchema = Joi.object({
  category: Joi.string()
    .valid(...categories)
    .required(),
});

const schemas = {
  contactJoiSchema,
  updateFavoriteJoiSchema,
  updateCategoryJoiSchema,
};

module.exports = { Contact, schemas };
