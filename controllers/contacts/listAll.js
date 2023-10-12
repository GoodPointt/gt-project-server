const { Contact } = require('../../models/contact');
const { HttpError } = require('../../utils');

const listAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite, category } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };

  if (favorite !== undefined) {
    if (favorite === 'true' || favorite === 'false') {
      query.favorite = favorite;
    } else {
      throw HttpError(400);
    }
  }
  if (category !== undefined) {
    if (
      category === 'none' ||
      category === 'friends' ||
      category === 'family' ||
      category === 'work'
    ) {
      query.category = category;
    } else throw HttpError(400);
  }

  const result = await Contact.find(query, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email subscription');
  res.json(result);
};

module.exports = listAll;
