import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

console.log(`Using the database ${process.env.DB_DATABASE}.`);

let databaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

if (process.env.DATABASE_URL) {
  databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  };
}

const connection = new Pool(databaseConfig);

export default connection;
