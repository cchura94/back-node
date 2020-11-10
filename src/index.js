// importar modulos
const express = require("express");
const rutas = require("./routes/index.js");

// declaración de variables
var puerto = 3000;
var host = "127.0.0.1";

// Configuración con los módulos
var app = express();

// habilitar rutas
rutas.adicionar(app);

// Middlewares

// Levantar el servidor
app.listen(puerto, host, () => {
    console.log("Servidor: http://"+host+":"+puerto);
});