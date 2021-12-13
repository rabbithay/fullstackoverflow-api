import Joi from 'joi';

export const newAnswerSchema = Joi.object({
  answer: Joi.string().required(),
});
