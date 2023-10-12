const { User } = require('../../models/user');
const { HttpError } = require('../../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) throw HttpError(401, 'Email or password invalid');

  if (!user.verify) throw HttpError(401, 'Email not veryfied');

  const isPasswordCompare = await bcrypt.compare(password, user.password);
  if (!isPasswordCompare) throw HttpError(401, 'Email or password invalid');

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      name: user.name,
      subscription: user.subscription,
    },
  });
};

module.exports = logIn;
