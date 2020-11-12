// importar el model
const {Usuario} = require("./../models/index");

// Metodos de logica

const nuevoUsuario = async function(req, res){
    //validar

    //gardar
    const datos = await Usuario.create(req.body);
    console.log("auto-generated ID:", datos.id);
    res.json({mensaje: "usuario registrado", data: datos})
}

// exportar los metodos
module.exports = {
    nuevoUsuario
}