const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { HttpError } = require('../../utils');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: tokenToRefresh } = req.body;

  try {
    const { id } = jwt.verify(tokenToRefresh, REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: tokenToRefresh });

    if (!isExist) throw HttpError(403, 'Token invalid');

    const payload = {
      id,
    };

    const token = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: '23h',
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: '7d',
    });

    const user = await User.findByIdAndUpdate(id, {
      token,
      refreshToken,
    });

    res.status(200).json({
      token,
      refreshToken,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

module.exports = refresh;
