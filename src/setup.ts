import dotenv from 'dotenv';
import './database/database'

const envFile = '.env';

dotenv.config({
  path: envFile,
});
