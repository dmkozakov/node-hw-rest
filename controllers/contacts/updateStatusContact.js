const { HttpError } = require("../../helpers");
const { ContactsService } = require("../../services");

const updateStatusContact = async (req, res) => {
  const { favorite } = req.body;
  if (!favorite) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await ContactsService.updateStatus(req);

  if (!result) {
    throw HttpError(400, "Not found");
  }

  res.status(201).json({ code: 201, data: result });
};

module.exports = updateStatusContact;
