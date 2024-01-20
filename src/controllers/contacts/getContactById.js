const { HttpError } = require("../../helpers");
const { ContactsService } = require("../services");

const getContactById = async (req, res) => {
  const result = await ContactsService.getByTd(req);

  if (!result) {
    throw HttpError(400, "Not found");
  }

  res.status(200).json({ code: 200, data: result });
};

module.exports = getContactById;
