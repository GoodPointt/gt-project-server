const { ctrlWrapper } = require("../../utils");
const getAllOfMonth = require("./getAllOfMonth");
const addTask = require("./addTask");
const editTask = require("./editTask");
const deleteTask = require("./deleteTask");

module.exports = {
  getAllOfMonth: ctrlWrapper(getAllOfMonth),
  addTask: ctrlWrapper(addTask),
  editTask: ctrlWrapper(editTask),
  deleteTask: ctrlWrapper(deleteTask),
};
