const { HttpError } = require("../../helpers");
const { ContactsService } = require("../../services");

const updateContact = async (req, res) => {
  const result = await ContactsService.update(req);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json({ code: 201, data: result });
};

module.exports = updateContact;
