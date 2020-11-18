//importamos el model
import {Producto} from './../models/index'


const listar = async (req, res) => {
    try{
        let datos = await Producto.findAll();
        res.json(datos);
    }catch(err) {
        console.log(err);
        res.json({mensaje: "Ocurrio un problema al recuperar los producto"}); 
    }
}

const guardar = async (req, res) => {
    try {
        let prod = await Producto.create(req.body);
        res.json({mensaje: "Producto registrado", dato: prod});
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al crear el producto"});
    }
}

const mostrar = async (req, res) => {
    try {
        let id = req.params.id;
        let prod = await Producto.findOne({
            where: {
                id
            }
        });
        res.json(prod);
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al buscar el producto"});
    }
}

module.exports = {
    listar,
    guardar,
    mostrar
}


