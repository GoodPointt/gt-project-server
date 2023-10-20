const { User } = require('../../models/user');
const { HttpError } = require('../../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email already exist');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '23h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: '7d',
  });
  await User.findByIdAndUpdate(newUser._id, { token, refreshToken });

  res.status(201).json({
    token,
    refreshToken,
    user: {
      email: newUser.email,
      username: newUser.username,
      avatarURL: newUser.avatarURL,
      birthday: newUser.birthday,
      skype: newUser.skype,
      phone: newUser.phone,
    },
  });
};

module.exports = signUp;
