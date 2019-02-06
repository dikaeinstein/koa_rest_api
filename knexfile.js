const path = require('path');
require('dotenv').config();

const BASE_PATH = path.join(__dirname, 'src', 'db');

const migrationsAndSeeds = {
  migrations: {
    directory: path.join(BASE_PATH, 'migrations')
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds')
  },
};

module.exports = {
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL_TEST,
    ...migrationsAndSeeds,
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL_DEV,
    ...migrationsAndSeeds,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ...migrationsAndSeeds,
  },
};
