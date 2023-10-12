const { User } = require('../../models/user');
const { HttpError, sendEmailSendGrid } = require('../../utils');
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, 'Email not found');
  if (user.verify) throw HttpError(401, 'Email already verified');

  const msg = {
    to: email,
    subject: 'Welcome!',
    html: `<p>Please finish authorization by following link below. <a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">Confirm registration!</a></p>`,
  };

  sendEmailSendGrid(msg);

  res.json({
    message: 'Verify email succesfully sended',
  });
};

module.exports = resendVerifyEmail;
