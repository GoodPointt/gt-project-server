const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/users");

const router = express.Router();

// upload.array('avatarURL', 8)
// upload.fields({name: 'avatarURL', maxCount: 8}, {name: 'subAavatarURL', maxCount: 3});
router.post("/signup", validateBody(schemas.userSignupJoiSchema), ctrl.signUp);

// router.get('/verify/:verificationToken', ctrl.verifyEmail);

// router.post(
//   '/verify',
//   validateBody(schemas.emailVerifyJoiSchema),
//   ctrl.resendVerifyEmail
// );

router.post("/login", validateBody(schemas.userLoginJoiSchema), ctrl.logIn);

router.post("/logout", authenticate, ctrl.logout);

router.post(
  "/reset",
  validateBody(schemas.resetPasswordSchema),
  ctrl.sendResetPassword
);

// router.patch(
//   '/',
//   authenticate,
//   validateBody(schemas.userChangeSubscriptionSchema),
//   ctrl.changeSubscription
// );

// router.patch(
//   '/avatars',
//   authenticate,
//   upload.single('avatar'),
//   ctrl.updateAvatar
// );

router.patch(
  "/edit",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.editUserProfileJoiSchema),
  ctrl.editProfile
);

module.exports = router;
