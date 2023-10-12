const { Contact } = require('../../models/contact');
const { HttpError } = require('../../utils');

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) throw HttpError(404);

  res.json(result);
};

module.exports = deleteById;
