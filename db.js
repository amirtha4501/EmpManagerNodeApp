const Sequelize = require('sequelize');
const UsersModel = require('./models/users');

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD, {
  dialect: process.env.DIALECT,
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