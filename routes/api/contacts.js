const express = require('express');

const ctrl = require('../../controllers/contacts');
const router = express.Router();

const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', authenticate, ctrl.listAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post(
  '/',
  authenticate,
  validateBody(schemas.contactJoiSchema),
  ctrl.addNew
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(schemas.contactJoiSchema),
  ctrl.updById
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteJoiSchema),
  ctrl.updFavorite
);

router.patch(
  '/:contactId/category',
  authenticate,
  isValidId,
  validateBody(schemas.updateCategoryJoiSchema),
  ctrl.updFavorite
);

router.delete('/:contactId', isValidId, ctrl.deleteById);

module.exports = router;
