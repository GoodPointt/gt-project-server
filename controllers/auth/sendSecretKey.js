const { User } = require('../../models/user');
const { sendEmailSendGrid, HttpError } = require('../../utils');
const bcrypt = require('bcrypt');

const sendSecretKey = async (req, res) => {
  const { email, _id } = req.user;
  const user = await User.findById(_id);

  if (!user) throw HttpError(404, 'User does not exist');

  const secretKey = await bcrypt.hash(_id.toString(), 10);

  const msg = {
    to: email,
    subject: 'GooseTrack account delete ',
    html: `<p>Enter this secret key to permanently delete your account:</p> <h1>${secretKey}</h1>`,
  };

  sendEmailSendGrid(msg);

  res
    .status(200)
    .json({ message: `Secret key was sent on ${email} successfully` });
};

module.exports = sendSecretKey;
