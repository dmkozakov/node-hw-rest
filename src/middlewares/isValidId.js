const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw HttpError(400, `${id} isn\`t valid id`);
  }
  next();
};

module.exports = isValidId;
