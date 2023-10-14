const express = require('express');
const ctrl = require('../../controllers/tasks');
const { taskJoiSchema } = require('../../models/task');

const router = express.Router();

const { isValidId, authenticate, validateBody } = require('../../middlewares');

router.get('/', authenticate, ctrl.getAllOfMonth);
router.post('/', authenticate, validateBody(taskJoiSchema), ctrl.addTask);
router.patch(
  '/:id',
  authenticate,
  validateBody(taskJoiSchema),
  isValidId,
  ctrl.editTask
);
router.delete('/:id', authenticate, isValidId, ctrl.deleteTask);

module.exports = router;
