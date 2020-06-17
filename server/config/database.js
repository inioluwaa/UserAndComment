const Sequelize = require('sequelize');

module.exports = new Sequelize('nodelogin', 'postgres', 'inioluwaak', {
  host: 'localhost',
  dialect: 'postgres'
});