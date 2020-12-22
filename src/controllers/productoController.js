//importamos el model
import {Producto} from './../models/index';

const sequelize = require("./../database/db")


const listar = async (req, res) => {
    try{
        let page = req.params.page;
        let limit = 20
        let offset = 0 + (page - 1) *limit
        let datos = await Producto.findAll({
            limit: limit,
            offset: offset
        });
        res.json(datos);
        //const [results, metadata] = await sequelize.query("SELECT * FROM productos");
        //res.json(results);
    }catch(err) {
        console.log(err);
        res.json({mensaje: "Ocurrio un problema al recuperar los producto"}); 
    }
}

const guardar = async (req, res) => {
    try {
        console.log("1. Antes: ", req.body)
        if(req.file){
            req.body.imagen = req.file.filename
        }
        console.log("1. Despues: ", req.body)
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

const modificar = async (req, res) =>{
    // Validar antes de guardar
    try {
        let id = req.params.id;
        let respuesta = await Producto.update(req.body, {where: {id: id}});
        res.json({mensaje: "Producto Modificado"});
    } catch (error) {
        console.log(error)
        res.json({mensaje: "Ocurrio un problema al modificar el producto"});
    }
}

const eliminar = async (req, res) => {
    try {
        let id_prod = req.params.id;
        await Producto.destroy({
            where: {
              id: id_prod
            }
          });
          res.json({mensaje: "Producto eliminado"});
        
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al modificar el producto"});
    }
}


module.exports = {
    listar,
    guardar,
    mostrar,
    modificar,
    eliminar
}


