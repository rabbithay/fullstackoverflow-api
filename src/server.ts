/* eslint-disable import/no-unresolved */
import app from './app';

const port = process.env.NODE_ENV === 'dev' ? 4002 : process.env.PORT;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
