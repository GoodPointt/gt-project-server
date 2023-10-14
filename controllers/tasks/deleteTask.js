const { Task } = require('../../models/task');
const { HttpError } = require('../../utils');

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const task = await Task.findOneAndDelete({ _id: id, owner });

  if (!task) {
    throw HttpError(405, 'Not allowed');
  }

  res.json({ message: 'Deleted succesfully' });
};

module.exports = deleteTask;
