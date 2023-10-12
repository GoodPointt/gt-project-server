const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../utils');

const emailRegexp =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;

const subscriptions = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [emailRegexp],
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, 'Password is required'],
    },
    avatarURL: {
      type: String,
      required: true,
      default: null,
    },

    subscription: {
      type: String,
      enum: subscriptions,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      required: [true, 'Verify token is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post('save', handleMongooseError);

const User = model('users', userSchema);

const emailVerifyJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': `⚠️"email" should be a type of 'text'`,
    'string.empty': `⚠️"email" cannot be an empty field`,
    'string.pattern.base': `⚠️"email" is not valid`,
    'any.required': `⚠️"email" is a required field`,
  }),
});

const userSignupJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `⚠️"name" should be a type of 'text'`,
    'string.empty': `⚠️"name" cannot be an empty field`,
    'any.required': `⚠️"name" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': `⚠️"email" should be a type of 'text'`,
    'string.empty': `⚠️"email" cannot be an empty field`,
    'string.pattern.base': `⚠️"email" is not valid`,
    'any.required': `⚠️"email" is a required field`,
  }),
  password: Joi.string().required().min(6).messages({
    'string.base': `⚠️"password" should be a type of 'text'`,
    'string.empty': `⚠️"password" cannot be an empty field`,
    'string.min': `⚠️"password" should have a minimum length of {#limit}`,
    'any.required': `⚠️"password" is a required field`,
  }),
  subscription: Joi.string(),
  token: Joi.string(),
});

const userLoginJoiSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    'string.base': `⚠️"email" should be a type of 'text'`,
    'string.empty': `⚠️"email" cannot be an empty field`,
    'string.pattern.base': `⚠️"email" is not valid`,
    'any.required': `⚠️"email" is a required field`,
  }),
  password: Joi.string().required().min(6).messages({
    'string.base': `⚠️"password" !should be a type of 'text'`,
    'string.empty': `⚠️"password" !cannot be an empty field`,
    'string.min': `⚠️"password" !should have a minimum length of {#limit}`,
    'any.required': `⚠️"password" !is a required field`,
  }),
  token: Joi.string(),
});

const userChangeSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptions)
    .required(),
});

const schemas = {
  userSignupJoiSchema,
  userLoginJoiSchema,
  userChangeSubscriptionSchema,
  emailVerifyJoiSchema,
};

module.exports = { User, schemas };
