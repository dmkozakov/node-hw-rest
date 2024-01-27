import Joi, { Schema } from 'joi';
import { emailRegex } from '../regexp';

const login: Schema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});
export default login;
