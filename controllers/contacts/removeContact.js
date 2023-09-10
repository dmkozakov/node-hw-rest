const { HttpError } = require("../../helpers");
const { ContactsService } = require("../services");

const removeContact = async (req, res) => {
  const result = await ContactsService.remove(req);

  if (!result) {
    throw HttpError(400, "Not found");
  }

  res.status(204).json({ code: 204, data: result });
};

module.exports = removeContact;
