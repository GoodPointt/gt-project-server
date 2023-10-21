const { User } = require('../../models/user');
const { HttpError } = require('../../utils');

const editProfile = async (req, res) => {
  const { _id } = req.user;
  const { email: newEmail } = req.body;
  const avatarURL = req.file ? req.file.path : '';

  const user = await User.findOne({ _id: { $ne: _id }, email: newEmail });

  if (user) {
    throw HttpError(409, 'Email already is use');
  }

  const newDataUser = avatarURL ? { ...req.body, avatarURL } : req.body;

  const editedUser = await User.findByIdAndUpdate(_id, newDataUser, {
    new: true,
  });

  if (!editedUser) {
    throw HttpError(404, "Not found user's id");
  }

  res.status(200).json({
    username: editedUser.username,
    email: editedUser.email,
    birthday: editedUser.birthday,
    phone: editedUser.phone,
    skype: editedUser.skype,
    avatarURL: editedUser.avatarURL,
  });
};

module.exports = editProfile;
