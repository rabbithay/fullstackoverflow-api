import Joi from 'joi';

export const positiveIntegerSchema = Joi.object({
  number: Joi.number().integer().positive(),
});
