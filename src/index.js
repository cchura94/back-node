// importar modulos
import express from "express";
//const express = require("express");
const rutas = require("./routes/index.js");
const db = require("./database/db")

// Test de conexion con base de datos

async function testConexion() {
    try {
        await db.authenticate();
        console.log('CONEXION CORRECTA.');
    } catch (error) {
        console.error('ERROR DE CONEXION: ', error);
    }
}
testConexion()

//db.sync({ force: true });
//console.log("Modelos migrados.");


// declaración de variables
var puerto = 3000;
var host = "127.0.0.1";

// Configuración con los módulos
var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// habilitar rutas
rutas.adicionar(app);

// Middlewares

// Levantar el servidor
app.listen(puerto, host, () => {
    console.log(`Servidor levantado: http://${host}:${puerto}`);
});