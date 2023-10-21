const bcrypt = require('bcrypt');

const { User } = require('../../models/user');
const { HttpError } = require('../../utils');

const deleteUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, "User with the ID doesn't exist.");
  }

  const { password } = req.body;

  const isPasswordCompare = await bcrypt.compare(password, user.password);

  if (!isPasswordCompare) {
    throw HttpError(400, 'Password invalid');
  }

  await User.findByIdAndRemove(user._id);

  res.status(200).json({ message: 'Account successfully deleted.' });
};

module.exports = deleteUser;
