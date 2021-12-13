import Joi from 'joi';

export const newUserSchema = Joi.object({
  name: Joi.string().required(),
  class: Joi.string().required(),
});
