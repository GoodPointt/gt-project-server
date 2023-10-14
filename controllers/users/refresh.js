const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { HttpError } = require('../../utils');
const { SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { token } = req.body;

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) throw HttpError(401);

    const payload = {
      id: user._id,
    };
    const refreshedToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token: refreshedToken });

    res.status(200).json({
      token: refreshedToken,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

module.exports = refresh;
