const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
const { HttpError } = require('../../utils');

const changePassword = async (req, res) => {
  const { _id, password } = req.user;
  const { newPassword, oldPassword } = req.body;

  const isComparePassword = await bcrypt.compare(oldPassword, password);

  if (!isComparePassword) throw HttpError(400, 'Password invalid');

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const user = await User.findByIdAndUpdate(
    _id,
    { password: hashedNewPassword },
    { new: true }
  );

  if (!user) throw HttpError(404);

  res.status(200).json({ message: 'Password change success' });
};

module.exports = changePassword;
