const { User } = require("../../models/user");
const { sendEmailSendGrid, HttpError } = require("../../utils");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

const sendResetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "User does not exist");

  const newPassword = nanoid();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });

  //   const resetToken = jwt.sign({ email: user.email }, SECRET_KEY, {
  //     expiresIn: "1h",
  //   });

  //   const newuser = await User.findByIdAndUpdate(user._id, {
  //     resetToken: resetToken,
  //   });

  const msg = {
    to: email,
    subject: "New ",
    html: `Your new password is ${newPassword}`,
  };

  sendEmailSendGrid(msg);

  res.status(200).json({ message: "Reset email sent successfully" });
};

module.exports = sendResetPassword;
