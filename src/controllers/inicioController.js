const {User, Categoria} = require("./../models/index")

import {Producto} from './../models/index';


const inicio = (req, res) => {
    res.json({"auth":true,"mensaje":"Autenticado"})
}

const saludo =  (req, res) => {
    res.send("Hola Mundo desde la segunda ruta!!");
}





const listaProductos = async (req, res) => {

    try{
        let datos = await Producto.findAll();
        res.json(datos);
    }catch(err) {
        console.log(err);
        res.json({mensaje: "Ocurrio un problema al recuperar los producto"}); 
    }
    
}

module.exports = {
    inicio,
    saludo,
    listaProductos
}