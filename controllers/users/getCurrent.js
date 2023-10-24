const getCurrent = async (req, res) => {
  const {
    email,
    username,
    avatarURL,
    birthday,
    skype,
    phone,
    isGoogleAuth = false,
  } = req.user;

  res.status(200).json({
    email,
    username,
    avatarURL,
    birthday,
    skype,
    phone,
    isGoogleAuth,
  });
};

module.exports = getCurrent;
