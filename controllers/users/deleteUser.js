const bcrypt = require('bcrypt');

const { HttpError } = require('../../../utils');
const { User } = require('../../models/user');

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  const payload = {
    _id: userId,
  };

  const user = await User.findById(payload);
  console.log(user);

  if (!user) {
    throw HttpError(404, "User with the ID doesn't exist.");
  }

  const { password } = req.body;
  console.log(password);

  const isPasswordCompare = await bcrypt.compare(password, user.password);

  if (!isPasswordCompare) {
    throw HttpError(401, 'Password invalid');
  }

  await User.findByIdAndRemove(user._id);

  res.status(200).json({ message: 'Account successfully deleted.' });
};

module.exports = deleteUser;
