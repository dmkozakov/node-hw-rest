const Joi = require("joi");

const updateFavoriteContact = Joi.object({
  favorite: Joi.boolean().required().messages({ "any.required": "Missing field favorite" }),
});

module.exports = updateFavoriteContact;
