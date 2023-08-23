const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(400, "Not found");
  }

  res.json(result);
};

module.exports = removeContact;
