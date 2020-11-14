const inicio_controller = require("./../controllers/inicioController");
const usuario_controller = require("./../controllers/usuarioController");
const authController = require("./../controllers/authController");

function adicionar(app){

    app.get("/", inicio_controller.inicio);

    //saludar
    app.get("/saludo", inicio_controller.saludo);

    // Rutas de Usuario
    app.post("/usuario", usuario_controller.nuevoUsuario); // promesas
    app.post("/usuario2", usuario_controller.nuevoUsuario2); // async-await

    //Autenticacion de usuarios
    app.post("/login", authController.ingresar);

}

module.exports = {
    adicionar
}
