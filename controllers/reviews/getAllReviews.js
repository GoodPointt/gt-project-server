const { Review } = require('../../models/review');

const getAllReviews = async (req, res) => {
  const allReviews = await Review.find()
    .sort({ createdAt: -1 })
    .populate('owner', 'username avatarURL');

  res.json(allReviews);
};

module.exports = getAllReviews;
