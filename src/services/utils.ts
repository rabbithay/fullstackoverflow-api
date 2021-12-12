import Joi from 'joi';

export function validateObject({
  object, schema,
}: {object: object, schema: Joi.ObjectSchema<any>}) {
  const validation = schema.validate(object);
  return !validation.error;
}
