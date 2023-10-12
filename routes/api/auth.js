const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/users');

const router = express.Router();

// upload.array('avatarURL', 8)
// upload.fields({name: 'avatarURL', maxCount: 8}, {name: 'subAavatarURL', maxCount: 3});
router.post(
  '/signup',
  upload.single('avatar'),
  validateBody(schemas.userSignupJoiSchema),
  ctrl.signUp
);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post(
  '/verify',
  validateBody(schemas.emailVerifyJoiSchema),
  ctrl.resendVerifyEmail
);

router.post('/login', validateBody(schemas.userLoginJoiSchema), ctrl.logIn);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.userChangeSubscriptionSchema),
  ctrl.changeSubscription
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

module.exports = router;
