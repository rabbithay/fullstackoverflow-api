import app from './app';

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Server exiting due to an unhandled promise rejection: ${promise} and reason ${reason}`);
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.error('Server exiting due to uncaught exception', error);
});

const port = process.env.NODE_ENV === 'dev' ? 4002 : process.env.PORT;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
