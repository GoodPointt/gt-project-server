const { ctrlWrapper } = require('../../utils');

const getCurrent = require('./getCurrent');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');
const editProfile = require('./editProfile');

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  editProfile: ctrlWrapper(editProfile),
};
