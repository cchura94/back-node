const inicio_controller = require("./../controllers/inicioController");
const usuario_controller = require("./../controllers/usuarioController");
const authController = require("./../controllers/authController");
// const productoController = require("./../controllers/productoController");
import productoController from "./../controllers/productoController";
import personaController from "./../controllers/personaController";
import pedidoController from "./../controllers/pedidoController"

import authMiddleware from "./../middleware/authMiddleware"

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
    app.get("/producto", authMiddleware.verificaAuth, productoController.listar);
    app.post("/producto", authMiddleware.verificaAuth, productoController.guardar);
    app.get("/producto/:id", authMiddleware.verificaAuth, productoController.mostrar);
    app.put("/producto/:id",authMiddleware.verificaAuth, productoController.modificar);
    app.delete("/producto/:id", authMiddleware.verificaAuth, productoController.eliminar);

    // Rutas de Persona
    app.get("/persona",authMiddleware.verificaAuth, personaController.listar);
    app.post("/persona", authMiddleware.verificaAuth, personaController.guardar);
    app.get("/persona/:id", authMiddleware.verificaAuth, personaController.mostrar);
    app.put("/persona/:id", authMiddleware.verificaAuth, personaController.modificar);
    app.delete("/persona/:id", authMiddleware.verificaAuth, personaController.eliminar);

    //AddProducto a Pedido
    app.get("/pedido/:id/comprar", pedidoController.compraProductos);
    // Rutas para Pedidos
    app.get("/pedido", authMiddleware.verificaAuth, pedidoController.index)
    app.post("/pedido", authMiddleware.verificaAuth, pedidoController.store)
}

module.exports = {
    adicionar
}
