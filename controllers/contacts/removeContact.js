const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(400, "Not found");
  }

  res.json(result);
};

module.exports = removeContact;
