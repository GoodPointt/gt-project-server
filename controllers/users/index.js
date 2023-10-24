const { ctrlWrapper } = require('../../utils');

const getCurrent = require('./getCurrent');
const editProfile = require('./editProfile');
const changePassword = require('./changePassword');
const deleteUser = require('./deleteUser');

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  editProfile: ctrlWrapper(editProfile),
  changePassword: ctrlWrapper(changePassword),
  deleteUser: ctrlWrapper(deleteUser),
};
