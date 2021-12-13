import Joi from 'joi';

export default function authValidate(bearerToken: string): string | false {
  if (bearerToken === undefined) return false;

  const bearerArray = bearerToken.split(' ');

  const schema = Joi.string().guid({
    version: [
      'uuidv4',
    ],
  });

  if (bearerArray.length !== 2 || bearerArray[0] !== 'Bearer') {
    return false;
  }

  const { value, error } = schema.validate(bearerArray[1]);

  return (error) ? false : value;
}
