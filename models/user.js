const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../utils');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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
      default: '',
    },
    birthday: {
      type: String,
      default: '',
    },
    skype: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    token: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
    isGoogleAuth: {
      type: Boolean,
      default: false,
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
  refreshToken: Joi.string(),
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
  refreshToken: Joi.string(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.empty': `"email" cannot be an empty field`,
    'string.pattern.base': `"email" is not valid`,
    'any.required': `"email" is a required field`,
  }),
});

const changePasswordSchema = Joi.object({
  newPassword: Joi.string().required().min(6).messages({
    'string.base': `"password" should be a type of 'text'`,
    'string.empty': `"password" cannot be an empty field`,
    'string.min': `"password" should have a minimum length of {#limit}`,
  }),
  oldPassword: Joi.string().required().min(6).messages({
    'string.base': `"password" should be a type of 'text'`,
    'string.empty': `"password" cannot be an empty field`,
    'string.min': `"password" should have a minimum length of {#limit}`,
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
  avatarURL: Joi.string().min(0),
  birthday: Joi.string().min(0),
  skype: Joi.string().min(0),
  phone: Joi.string().min(0).messages({
    'string.base': `"phone" should be a type of 'text'`,
    'string.pattern.base': `"phone" is not valid`,
  }),
});

const deleteUserSchema = Joi.object({
  secretKey: Joi.string().required().messages({
    'string.base': `"secretKey" !should be a type of 'text'`,
    'string.empty': `"secretKey" !cannot be an empty field`,
    'any.required': `"secretKey" !is a required field`,
  }),
});

const refreshUserJoiSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const schemas = {
  userSignupJoiSchema,
  userLoginJoiSchema,
  emailVerifyJoiSchema,
  resetPasswordSchema,
  editUserProfileJoiSchema,
  refreshUserJoiSchema,
  changePasswordSchema,
  deleteUserSchema,
};

module.exports = { User, schemas };
