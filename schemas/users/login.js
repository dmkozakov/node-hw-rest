const Joi = require("joi");
const emailRegex = require("../regexp");

const login = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

module.exports = login;
