const { Contact } = require('../../models/contact');

const { HttpError } = require('../../utils');

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) throw HttpError(404);
  res.json(result);
};

module.exports = getById;
