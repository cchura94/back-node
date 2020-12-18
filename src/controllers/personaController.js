//importamos el model
import {Persona} from './../models/index'


const listar = async (req, res) => {
    try{
        let datos = await Persona.findAll();
        res.json(datos);
    }catch(err) {
        console.log(err);
        res.json({mensaje: "Ocurrio un problema al recuperar las personas"}); 
    }
}

const guardar = async (req, res) => {
    try {
        let per = await Persona.create(req.body);
        res.json({mensaje: "Persona registrado", dato: per});
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al crear el producto"});
    }
}

const mostrar = async (req, res) => {
    try {
        let id = req.params.id;
        let per = await Persona.findOne({
            where: {
                id
            }
        });
        res.json(per);
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al buscar el producto"});
    }
}

const modificar = async (req, res) =>{
    // Validar antes de guardar
    try {
        let id = req.params.id;
        let respuesta = await Persona.update(req.body, {where: {id: id}});
        res.json({mensaje: "Persona Modificado"});
    } catch (error) {
        console.log(error)
        res.json({mensaje: "Ocurrio un problema al modificar el producto"});
    }
}

const eliminar = async (req, res) => {
    try {
        let id_prod = req.params.id;
        await Persona.destroy({
            where: {
              id: id_prod
            }
          });
          res.json({mensaje: "Persona eliminado"});
        
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al modificar el producto"});
    }
}

const verificaCliente = async (req, res) => {
    try{
        let id_user = req.params.id_user; //id de usuario
        datos = await Persona.findOne({where: {usuario_id: id_user}})
        if(datos){

            res.json(datos);
        }else{
            res.json({estado: null})
        }
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    listar,
    guardar,
    mostrar,
    modificar,
    eliminar,
    verificaCliente
}


