const { ctrlWrapper } = require('../../utils');
const getAllReviews = require('./getAllReviews');
const addReview = require('./addReview');
const deleteReview = require('./deleteReview');
const editReview = require('./editReview');
const getOwnReview = require('./getOwnReview');

module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews),
  addReview: ctrlWrapper(addReview),
  deleteReview: ctrlWrapper(deleteReview),
  editReview: ctrlWrapper(editReview),
  getOwnReview: ctrlWrapper(getOwnReview),
};
