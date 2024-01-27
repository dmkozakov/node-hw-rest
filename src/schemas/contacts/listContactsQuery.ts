import Joi, { Schema } from 'joi';

const listContactsQuery: Schema = Joi.object({
  favorite: Joi.string().valid('true', 'false'),
  page: Joi.string(),
  limit: Joi.string(),
});

export default listContactsQuery;
