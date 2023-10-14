const { ctrlWrapper } = require('../../utils');

const signUp = require('../auth/signUp');
const logIn = require('../auth/logIn');
const logout = require('../auth/logout');
const googleAuth = require('../auth/googleAuth');
const sendResetPassword = require('../auth/sendResetPassword');
const googleRedirect = require('../auth/googleRedirect');
const refresh = require('../auth/refresh');


module.exports = {
    signUp: ctrlWrapper(signUp),
    logIn: ctrlWrapper(logIn),
    logout: ctrlWrapper(logout),
    sendResetPassword: ctrlWrapper(sendResetPassword),
    googleAuth: ctrlWrapper(googleAuth),
    googleRedirect: ctrlWrapper(googleRedirect),
    refresh: ctrlWrapper(refresh),
};
