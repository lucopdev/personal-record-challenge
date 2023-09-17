import { Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'dbRecords',
  host: process.env.DB_HOST || 'database',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
};

export = config;