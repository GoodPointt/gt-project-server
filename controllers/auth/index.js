const { ctrlWrapper } = require('../../utils');

const signUp = require('../auth/signUp');
const logIn = require('../auth/logIn');
const logout = require('../auth/logout');
const googleAuth = require('../auth/googleAuth');
const sendResetPassword = require('../auth/sendResetPassword');
const googleRedirect = require('../auth/googleRedirect');
const refresh = require('../auth/refresh');
const sendSecretKey = require('../auth/sendSecretKey');

module.exports = {
  signUp: ctrlWrapper(signUp),
  logIn: ctrlWrapper(logIn),
  logout: ctrlWrapper(logout),
  sendResetPassword: ctrlWrapper(sendResetPassword),
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
  refresh: ctrlWrapper(refresh),
  sendSecretKey: ctrlWrapper(sendSecretKey),
};
