const Joi = require("joi");
const emailRegex = require("../regexp");

const register = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  avatarUrl: Joi.string(),
});

module.exports = register;
