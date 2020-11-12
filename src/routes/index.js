const inicio_controller = require("./../controllers/inicioController");
const usuario_controller = require("./../controllers/usuarioController");

function adicionar(app){

    app.get("/", inicio_controller.inicio);

    //saludar
    app.get("/saludo", inicio_controller.saludo);

    // Rutas de Usuario
    app.post("/usuario", usuario_controller.nuevoUsuario);

}

module.exports = {
    adicionar
}
