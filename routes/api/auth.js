const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post('/signup', validateBody(schemas.userSignupJoiSchema), ctrl.signUp);

router.post('/login', validateBody(schemas.userLoginJoiSchema), ctrl.logIn);

router.post('/logout', authenticate, ctrl.logout);

router.post(
  '/reset',
  validateBody(schemas.resetPasswordSchema),
  ctrl.sendResetPassword
);
router.get('/removekey', authenticate, ctrl.sendSecretKey);

router.post(
  '/refresh',
  validateBody(schemas.refreshUserJoiSchema),
  ctrl.refresh
);

router.get('/google', ctrl.googleAuth);
router.get('/google-redirect', ctrl.googleRedirect);

module.exports = router;
