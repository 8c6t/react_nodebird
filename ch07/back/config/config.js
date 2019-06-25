const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
}
