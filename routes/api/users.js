const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/users');

const router = express.Router();

router.get('/current', authenticate, ctrl.getCurrent);

router.patch(
  '/edit',
  authenticate,
  upload.single('avatarURL'),
  validateBody(schemas.editUserProfileJoiSchema),
  ctrl.editProfile
);

router.patch(
  '/edit/password',
  authenticate,
  validateBody(schemas.changePasswordSchema),
  ctrl.changePassword
);

router.delete(
  '/delete',
  authenticate,
  validateBody(schemas.deleteUserSchema),
  ctrl.deleteUser
);

module.exports = router;
