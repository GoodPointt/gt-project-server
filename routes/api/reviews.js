const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { reviewJoiSchema } = require('../../models/review');
const ctrl = require('../../controllers/reviews');

const router = express.Router();

router.get('/', ctrl.getAllReviews);

router.get('/own', authenticate, ctrl.getOwnReview);

router.post(
  '/own',
  authenticate,
  validateBody(reviewJoiSchema),
  ctrl.addReview
);

router.patch(
  '/own',
  authenticate,
  validateBody(reviewJoiSchema),
  ctrl.editReview
);

router.delete('/own', authenticate, ctrl.deleteReview);

module.exports = router;
