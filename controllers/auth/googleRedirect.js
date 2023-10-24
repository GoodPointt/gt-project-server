const URL = require('url');
const axios = require('axios');
const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  const urlObj = URL.parse(fullUrl, true);

  const urlParams = urlObj.query;

  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const user = await User.findOne({ email: userData.data.email });
  if (user) {
    const payload = {
      id: user._id,
    };

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
      expiresIn: '23h',
    });

    await User.findByIdAndUpdate(user._id, {
      refreshToken,
      isGoogleAuth: true,
    });

    return res.redirect(`${process.env.FRONTEND_URL}?token=${refreshToken}`);
  }

  const password = nanoid();
  const hashedPassword = await bcrypt.hash(password, 10);

  const userBody = {
    email: userData.data.email,
    username: userData.data.name,
    avatarURL: userData.data.picture,
    password: hashedPassword,
    isGoogleAuth: true,
  };

  const newUser = await User.create(userBody);

  const payload = {
    id: newUser._id,
  };

  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: '23h',
  });

  await User.findByIdAndUpdate(newUser._id, {
    refreshToken,
  });

  return res.redirect(`${process.env.FRONTEND_URL}?token=${refreshToken}`);
};

module.exports = googleRedirect;
