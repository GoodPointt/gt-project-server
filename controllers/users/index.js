const { ctrlWrapper } = require("../../utils");

const signUp = require("./signUp");
const logIn = require("./logIn");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const changeSubscription = require("./changeSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const sendResetPassword = require("./sendResetPassword");
const editProfile = require("./editProfile");

module.exports = {
  signUp: ctrlWrapper(signUp),
  logIn: ctrlWrapper(logIn),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  changeSubscription: ctrlWrapper(changeSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  sendResetPassword: ctrlWrapper(sendResetPassword),
  editProfile: ctrlWrapper(editProfile),
};
