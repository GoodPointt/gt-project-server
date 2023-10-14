const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../utils');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^[+\d-]{6,}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
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
      default: null,
    },
    birthday: {
      type: Date,
      default: null,
    },
    skype: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      match: [phoneRegexp],
      default: null,
    },
    token: {
      type: String,
      default: null,
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
    'string.base': `"email" should be a type of 'text'`,
    'string.empty': `"email" cannot be an empty field`,
    'string.pattern.base': `"email" is not valid`,
    'any.required': `"email" is a required field`,
  }),
});

const userSignupJoiSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.base': `"username" should be a type of 'text'`,
    'string.empty': `"username" cannot be an empty field`,
    'any.required': `"username" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.empty': `"email" cannot be an empty field`,
    'string.pattern.base': `"email" is not valid`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string().required().min(6).messages({
    'string.base': `"password" should be a type of 'text'`,
    'string.empty': `"password" cannot be an empty field`,
    'string.min': `"password" should have a minimum length of {#limit}`,
    'any.required': `"password" is a required field`,
  }),
  token: Joi.string(),
});

const userLoginJoiSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.empty': `"email" cannot be an empty field`,
    'string.pattern.base': `"email" is not valid`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string().required().min(6).messages({
    'string.base': `"password" !should be a type of 'text'`,
    'string.empty': `"password" !cannot be an empty field`,
    'string.min': `"password" !should have a minimum length of {#limit}`,
    'any.required': `"password" !is a required field`,
  }),
  token: Joi.string(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    'string.base': `⚠️"email" should be a type of 'text'`,
    'string.empty': `⚠️"email" cannot be an empty field`,
    'string.pattern.base': `⚠️"email" is not valid`,
    'any.required': `⚠️"email" is a required field`,
  }),
});

const editUserProfileJoiSchema = Joi.object({
  username: Joi.string().messages({
    'string.base': `"username" should be a type of 'text'`,
    'string.empty': `"username" cannot be an empty field`,
  }),
  email: Joi.string().required().pattern(emailRegexp).messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.empty': `"email" cannot be an empty field`,
    'string.pattern.base': `"email" is not valid`,
    'any.required': `"email" is a required field`,
  }),
  avatarURL: Joi.string(),
  birthday: Joi.string(),
  skype: Joi.string(),
  phone: Joi.string().min(6).pattern(phoneRegexp).messages({
    'string.base': `"phone" should be a type of 'text'`,
    'string.pattern.base': `"phone" is not valid`,
  }),
});

const refreshUserJoiSchema = Joi.object({
  token: Joi.string().required(),
});

const schemas = {
  userSignupJoiSchema,
  userLoginJoiSchema,
  emailVerifyJoiSchema,
  resetPasswordSchema,
  editUserProfileJoiSchema,
  refreshUserJoiSchema,
};

module.exports = { User, schemas };
