import Joi, { Schema } from "joi";

const updateFavoriteContact: Schema = Joi.object({
  favorite: Joi.boolean().required().messages({ "any.required": "Missing field favorite" }),
});

export default updateFavoriteContact;
