const { User } = require('../../models/user');
const { HttpError } = require('../../utils');
const { Review } = require('../../models/review');
const { Task } = require('../../models/task');

const deleteUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, "User with the ID doesn't exist.");
  }

  const { secretKey } = req.body;

  const isSecretKeyCompare = user._id.toString() === secretKey;

  if (!isSecretKeyCompare) {
    throw HttpError(401, 'Secret key is invalid');
  }

  await Review.deleteMany({ owner: user._id });

  await Task.deleteMany({ owner: user._id });

  await User.findByIdAndRemove(user._id);

  res.status(200).json({ message: 'Account successfully deleted.' });
};

module.exports = deleteUser;
