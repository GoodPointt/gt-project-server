const { Review } = require('../../models/review');
const { HttpError } = require('../../utils');

const addReview = async (req, res) => {
  const { _id: owner } = req.user;

  const ownReview = await Review.findOne({ owner });

  if (ownReview) {
    throw HttpError(409, 'Review already exist');
  }

  const createdReview = await Review.create({ ...req.body, owner });

  res.status(201).json({
    rating: createdReview.rating,
    text: createdReview.text,
  });
};

module.exports = addReview;
