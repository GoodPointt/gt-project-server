const getCurrent = async (req, res) => {
  const { email, username, avatarURL, birthday, skype, phone } = req.user;

  res.status(200).json({
    email,
    username,
    avatarURL,
    birthday,
    skype,
    phone,
  });
};

module.exports = getCurrent;
