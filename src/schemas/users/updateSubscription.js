const Joi = require("joi");

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "Missing field subscription" }),
});

module.exports = updateSubscription;
