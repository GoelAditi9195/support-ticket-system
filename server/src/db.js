import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Sequelize } from 'sequelize';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'tickets.db'),
  logging: false,
});