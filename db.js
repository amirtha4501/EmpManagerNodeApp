const Sequelize = require('sequelize');
const UsersModel = require('./models/users');

const sequelize = new Sequelize(
  'saaragh',
  'root',
  'password', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
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