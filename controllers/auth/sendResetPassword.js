const { User } = require('../../models/user');
const { sendEmailSendGrid, HttpError } = require('../../utils');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const sendResetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, 'User does not exist');

  const newPassword = nanoid();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });

  const msg = {
    from: {
      name: 'GooseTrack',
    },
    to: email,
    subject: 'GooseTrack password reset ',
    html: `<p>Your new password is </p> <h4>${newPassword}</h4>`,
  };

  sendEmailSendGrid(msg);

  res.status(200).json({ message: 'Reset email sent successfully' });
};

module.exports = sendResetPassword;
