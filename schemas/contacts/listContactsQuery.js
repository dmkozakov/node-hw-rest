const Joi = require("joi");

const listContactsQuery = Joi.object({
  favorite: Joi.string().valid("true", "false"),
  page: Joi.string(),
  limit: Joi.string(),
});

module.exports = listContactsQuery;
