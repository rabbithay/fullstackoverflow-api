import Joi from 'joi';

export const tokenSchema = Joi.string().guid({
  version: [
    'uuidv4',
  ],
});
