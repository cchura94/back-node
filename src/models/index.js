const {Sequelize} = require("sequelize");
const db = require("./../database/db");


const User = db.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    activo: Sequelize.BOOLEAN
})


const Categoria = db.define('Categoria', {
    nombre: Sequelize.STRING,
    descripcion: Sequelize.TEXT,
    activo: Sequelize.BOOLEAN
})

module.exports = {
    User,
    Categoria
}