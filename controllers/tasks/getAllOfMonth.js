const { Task } = require('../../models/task');
const { HttpError } = require('../../utils');

const getAllOfMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;

  if (!date) {
    throw HttpError(400, 'Bad Request');
  }

  const result = await Task.find(
    { owner, date: { $regex: date, $options: 'i' } },
    '-createdAt -updatedAt'
  ).populate('owner', 'username avatarURL');

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = getAllOfMonth;
