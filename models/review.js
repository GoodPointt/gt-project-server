const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');
const Joi = require('joi');

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
    },
    text: {
      type: String,
      required: [true, 'Review text is required'],
      maxlength: 254,
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

reviewSchema.post('save', handleMongooseError);

const reviewJoiSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  text: Joi.string().max(300).required(),
});

const Review = model('review', reviewSchema);

module.exports = { Review, reviewJoiSchema };
