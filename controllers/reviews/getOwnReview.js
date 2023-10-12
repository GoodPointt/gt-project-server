const { Review } = require('../../models/review');
// const { HttpError } = require('../../utils');

const getOwnReview = async (req, res) => {
  const { _id: owner } = req.user;

  const ownReview = await Review.findOne({ owner });

  if (!ownReview) res.json({});

  if (ownReview)
    res.json({
      rating: ownReview.rating,
      text: ownReview.text,
    });
};

module.exports = getOwnReview;
