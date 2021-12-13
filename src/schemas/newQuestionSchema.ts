import Joi from 'joi';

export const newQuestionSchema = Joi.object({
  question: Joi.string().required(),
  student: Joi.string().required(),
  class: Joi.string().required(),
  tags: Joi.string().allow(null, ''),
});
