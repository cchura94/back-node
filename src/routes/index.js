const inicio_controller = require("./../controllers/inicioController");

function adicionar(app){

    app.get("/", inicio_controller.inicio);

    //saludar
    app.get("/saludo", inicio_controller.saludo);

}

module.exports = {
    adicionar
}
