import Joi, { Schema } from 'joi';
import { emailRegex } from '../regexp';

const register: Schema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
  avatarUrl: Joi.string(),
});

export default register;
