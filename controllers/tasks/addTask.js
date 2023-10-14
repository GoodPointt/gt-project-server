const { Task } = require('../../models/task');

const addTask = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Task.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = addTask;
