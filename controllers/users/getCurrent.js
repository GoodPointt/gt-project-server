const getCurrent = async (req, res) => {
  const { email, name, subscription } = req.user;

  res.status(200).json({
    email,
    name,
    subscription,
  });
};

module.exports = getCurrent;
