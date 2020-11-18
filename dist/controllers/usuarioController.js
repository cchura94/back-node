"use strict";

// importar el model
const bcrypt = require('bcrypt');

const {
  Usuario
} = require("./../models/index");

const config = require("./../config/config"); // Metodos de logica


const nuevoUsuario = function (req, res) {
  //validar
  //console.log("******* BODY: ", req.body);
  //Verificar si el correo existe o no existe
  let correo = req.body.correo;

  if (correo && req.body.password) {
    Usuario.findOne({
      where: {
        correo
      }
    }).then(user => {
      if (user) {
        console.log("*************** USUARIO EXISTE ******** ");
        res.json({
          mensaje: "El correo ya existe en la base de Datos"
        });
      } else {
        console.log("*************** USUARIO NO EXISTE ******** ");
        var u = {
          correo: req.body.correo,
          password: bcrypt.hashSync(req.body.password, config.salt_rounds)
        };
        Usuario.create(u).then(dato => {
          res.json({
            mensaje: "usuario registrado",
            data: dato
          });
        }).catch(error => {
          //console.log(error);
          res.json({
            mensaje: "Ocurrió un problema al registrar el usuario"
          });
        });
      }
    });
  } else {
    res.json({
      mensaje: "Los campos correo o password son obligatorios"
    });
  }
};

const nuevoUsuario2 = async function (req, res) {
  let correo = req.body.correo;

  if (correo && req.body.password) {
    try {
      const user = await Usuario.findOne({
        where: {
          correo
        }
      });

      if (user) {
        console.log("*************** USUARIO EXISTE ******** ");
        res.json({
          mensaje: "El correo ya existe en la base de Datos"
        });
      } else {
        console.log("*************** USUARIO NO EXISTE ******** ");
        var u = {
          correo: req.body.correo,
          password: bcrypt.hashSync(req.body.password, config.salt_rounds)
        };
        const dato = await Usuario.create(u);
        res.json({
          mensaje: "usuario registrado",
          data: dato
        });
      }
    } catch (error) {
      res.json({
        mensaje: "Ocurrió un problema al registrar el usuario"
      });
    }
  } else {
    res.json({
      mensaje: "Los campos correo o password son obligatorios"
    });
  }
}; // exportar los metodos


module.exports = {
  nuevoUsuario,
  nuevoUsuario2
};