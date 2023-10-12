const { Contact } = require('../../models/contact');
const { HttpError } = require('../../utils');

const updById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw HttpError(404);

  res.json(result);
};

module.exports = updById;
