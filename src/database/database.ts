import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

console.log(`Using the database ${process.env.DB_DATABASE}.`);

const databaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

const connection = new Pool(databaseConfig);

export default connection;
