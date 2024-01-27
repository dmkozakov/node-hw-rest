import Joi, { Schema } from 'joi';

const updateSubscription: Schema = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .required()
    .messages({ 'any.required': 'Missing field subscription' }),
});

export default updateSubscription;
