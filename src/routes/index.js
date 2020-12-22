const inicio_controller = require("./../controllers/inicioController");
const usuario_controller = require("./../controllers/usuarioController");
const authController = require("./../controllers/authController");
// const productoController = require("./../controllers/productoController");
import productoController from "./../controllers/productoController";
import personaController from "./../controllers/personaController";
import pedidoController from "./../controllers/pedidoController"

import authMiddleware from "./../middleware/authMiddleware"

import multer from 'multer'
// Configuracion para subida de imagenes con multer

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/imagenes");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"-"+file.originalname)        
    }
});

const upload = multer({
    storage
}).single("imagen");

// RUTAS

function adicionar(app){

    app.get("/", authMiddleware.verificaAuth,inicio_controller.inicio);
    app.get("/pagina", inicio_controller.listaProductos);

    //saludar
    app.get("/saludo", inicio_controller.saludo);

    // Rutas de Usuario
    app.post("/usuario", usuario_controller.nuevoUsuario); // promesas
    app.post("/usuario2", usuario_controller.nuevoUsuario2); // async-await

    //Autenticacion de usuarios
    app.post("/login", authController.ingresar);

    // Rutas de Productos
    app.get("/producto/:page", authMiddleware.verificaAuth, productoController.listar);
    app.post("/producto", authMiddleware.verificaAuth, upload, productoController.guardar);
    app.get("/producto/:id", authMiddleware.verificaAuth, productoController.mostrar);
    app.put("/producto/:id",authMiddleware.verificaAuth, productoController.modificar);
    app.delete("/producto/:id", authMiddleware.verificaAuth, productoController.eliminar);

    // Rutas de Persona
    app.get("/persona",authMiddleware.verificaAuth, personaController.listar);
    app.post("/persona", authMiddleware.verificaAuth, personaController.guardar);
    app.get("/persona/:id", authMiddleware.verificaAuth, personaController.mostrar);
    app.put("/persona/:id", authMiddleware.verificaAuth, personaController.modificar);
    app.delete("/persona/:id", authMiddleware.verificaAuth, personaController.eliminar);
    app.get("/persona/:id_user", authMiddleware.verificaAuth, personaController.verificaCliente)

    //AddProducto a Pedido
    app.post("/pedido/nuevo-pedido", authMiddleware.verificaAuth, pedidoController.nuevoPedido);
    // Rutas para Pedidos
    app.get("/pedido", authMiddleware.verificaAuth, pedidoController.index)
    app.post("/pedido", authMiddleware.verificaAuth, pedidoController.store)

 }

module.exports = {
    adicionar
}
