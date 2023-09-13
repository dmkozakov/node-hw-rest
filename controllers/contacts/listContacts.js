const { HttpError } = require("../../helpers");
const { ContactsService } = require("../../services");


const listContacts = async (req, res) => {
  const result = await ContactsService.getAll(req);

  if (!result) {
    throw HttpError(400, "Unable to fetch contacts");
  }

  res.status(200).json({ code: 200, data: result });
};

module.exports = listContacts;
