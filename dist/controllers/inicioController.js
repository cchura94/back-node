"use strict";

const {
  User,
  Categoria
} = require("./../models/index");

const inicio = (req, res) => {
  res.send("Hola Mundo desde el controlador");
};

const saludo = (req, res) => {
  res.send("Hola Mundo desde la segunda ruta!!");
};

module.exports = {
  inicio,
  saludo
};