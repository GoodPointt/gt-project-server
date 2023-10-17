const { Task } = require('../../models/task');
const { HttpError } = require('../../utils');

const editTask = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const task = await Task.findById(id);

  if (!task) {
    throw HttpError(404, 'Not Found');
  }

  const result = await Task.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(405, 'Not Allowed');
  }

  res.json(result);
};

module.exports = editTask;
