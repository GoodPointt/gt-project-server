const { User } = require('../../models/user');

const changeSubscription = async (req, res) => {
  const { _id, email, name } = req.user;
  const { subscription } = req.body;
  if (
    (subscription !== undefined && subscription === 'starter') ||
    subscription === 'pro' ||
    subscription === 'business'
  )
    await User.findByIdAndUpdate(_id, { subscription });

  res.status(200).json({ email, name, subscription });
};

module.exports = changeSubscription;
