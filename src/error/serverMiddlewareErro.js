// eslint-disable-next-line no-unused-vars
export async function serverMiddlewareError(error, request, response, next) {
  console.log({ error, request, response });
  return response.sendStatus(500);
}
