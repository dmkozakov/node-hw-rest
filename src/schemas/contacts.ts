import { Schema } from 'joi';
import Joi from 'joi';

export const addSchema: Schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
