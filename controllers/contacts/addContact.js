const { HttpError } = require("../../helpers");
const { ContactsService } = require("../services");

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw HttpError(400, "Missing required fields");
  }

  const result = await ContactsService.add(req);

  if (!result) {
    throw HttpError(400, "Unable to add contact");
  }

  res.status(201).json({ code: 201, data: result });
};

module.exports = addContact;
