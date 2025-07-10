const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'user', 'eren139', {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports={sequelize};