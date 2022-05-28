const Sequelize = require('sequelize');
const UsersModel = require('./models/users');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

const Users = UsersModel(sequelize, Sequelize);

module.exports = async () => {

  const Models = {
    Sequelize,
    sequelize,
    Users
  }

  await sequelize.authenticate();
  console.log('Created a connection');

  return Models;
}