const { User } = require('../../models/user');

async function editProfile(req, res) {
  const userId = req.user._id;
  const { email: newEmail } = req.body;

  const avatar = req.file ? req.file.path : null;

  const user = await User.findOne({ _id: { $ne: userId }, email: newEmail });
  if (user) {
    return res.status(409).json({ message: 'Email already exist' });
  }

  const newUserData = {
    ...req.body,
    avatarURL: avatar
  };
  const newUser = await User.findByIdAndUpdate(userId, newUserData, {
    new: true,
  });

  res.status(200).json({
    username: newUser.username,
    email: newUser.email,
    birthday: newUser.birthday,
    phone: newUser.phone,
    skype: newUser.skype,
    avatarURL: newUser.avatarURL,
  });
}

module.exports = editProfile;
