"use strict";

const {
  Sequelize
} = require('sequelize');

const sequelize = new Sequelize('prueba_seq', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
  /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  //port: 5432,

});
module.exports = sequelize;