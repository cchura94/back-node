"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importar modulos
//const express = require("express");
const rutas = require("./routes/index.js");

const db = require("./database/db"); // Test de conexion con base de datos


async function testConexion() {
  try {
    await db.authenticate();
    console.log('CONEXION CORRECTA.');
  } catch (error) {
    console.error('ERROR DE CONEXION: ', error);
  }
}

testConexion(); //db.sync({ force: true });
//console.log("Modelos migrados.");
// declaración de variables

var puerto = 3000;
var host = "127.0.0.1"; // Configuración con los módulos

var app = (0, _express.default)();
app.use(_express.default.json()); // for parsing application/json

app.use(_express.default.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
// habilitar rutas

rutas.adicionar(app); // Middlewares
// Levantar el servidor

app.listen(puerto, host, () => {
  console.log("Servidor levantado: http://" + host + ":" + puerto);
});