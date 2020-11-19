const inicio_controller = require("./../controllers/inicioController");
const usuario_controller = require("./../controllers/usuarioController");
const authController = require("./../controllers/authController");
// const productoController = require("./../controllers/productoController");
import productoController from "./../controllers/productoController";
import personaController from "./../controllers/personaController"

function adicionar(app){

    app.get("/", inicio_controller.inicio);

    //saludar
    app.get("/saludo", inicio_controller.saludo);

    // Rutas de Usuario
    app.post("/usuario", usuario_controller.nuevoUsuario); // promesas
    app.post("/usuario2", usuario_controller.nuevoUsuario2); // async-await

    //Autenticacion de usuarios
    app.post("/login", authController.ingresar);

    // Rutas de Productos
    app.get("/producto", productoController.listar);
    app.post("/producto", productoController.guardar);
    app.get("/producto/:id", productoController.mostrar);
    app.put("/producto/:id", productoController.modificar);
    app.delete("/producto/:id", productoController.eliminar);

    // Rutas de Persona
    app.get("/persona", personaController.listar);
    app.post("/persona", personaController.guardar);
    app.get("/persona/:id", personaController.mostrar);
    app.put("/persona/:id", personaController.modificar);
    app.delete("/persona/:id", personaController.eliminar);

}

module.exports = {
    adicionar
}
