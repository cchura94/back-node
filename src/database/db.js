const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prueba_seq', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

module.exports = sequelize