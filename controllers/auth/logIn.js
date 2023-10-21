const { User } = require('../../models/user');
const { HttpError } = require('../../utils');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) throw HttpError(401, 'Email or password invalid');

  const isPasswordCompare = await bcrypt.compare(password, user.password);

  if (!isPasswordCompare) throw HttpError(401, 'Email or password invalid');

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '23h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: '7d',
  });
  await User.findByIdAndUpdate(
    user._id,
    { token, refreshToken },
    { new: true }
  );

  res.status(200).json({
    token,
    refreshToken,
    user: {
      email: user.email,
      username: user.username,
      avatarURL: user.avatarURL,
      birthday: user.birthday,
      skype: user.skype,
      phone: user.phone,
    },
  });
};

module.exports = logIn;
