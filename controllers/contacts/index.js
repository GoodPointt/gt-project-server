const { ctrlWrapper } = require('../../utils');
const listAll = require('./listAll');
const getById = require('./getById');
const addNew = require('./addNew');
const updById = require('./updById');
const updFavorite = require('./updFavorite');
const updCategory = require('./updCategory');
const deleteById = require('./deleteById');

module.exports = {
  listAll: ctrlWrapper(listAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  updById: ctrlWrapper(updById),
  updFavorite: ctrlWrapper(updFavorite),
  updCategory: ctrlWrapper(updCategory),
  deleteById: ctrlWrapper(deleteById),
};
