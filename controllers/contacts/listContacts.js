const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  if (favorite !== undefined) {
    const result = await query.all("favorite", favorite).exec();

    return res.json(result);
  }

  const result = await query.exec();

  res.json(result);
};

module.exports = listContacts;
