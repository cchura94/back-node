
import { Pedido, Producto } from "./../models"

// lista
const index = async (req, res) => {
    try {
        const datos = await Pedido.findAll();
        res.json(datos);
               
    } catch (error) {
        res.json({mensaje: "Ocurrió un error al recuperar los pedidos"});
    }
}

//crear (cargar el formulario de creacion)
//const create

//guardar
const store = async (req, res) => {
    try {
        let ped = await Pedido.create(req.body);
        res.json({mensaje: "Pedido registrado", dato: ped});

    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al crear el pedido"});
    }
}

//mostrar
const show = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// editar (carga el formulario de edicion)
//const edit 

//modificar 
const update = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//eliminar
const destroy = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const compraProductos = async (req, res) => {
    try {
        
        var id_pedido = req.params.id;
        const ped = await Pedido.findOne({where: {id: id_pedido}});
        console.log("Llegandooo", ped)
        const prod = await Producto.create({titulo: "Producto prueba", precio: 100, cantidad: 5});
        const prod2 = await Producto.create({titulo: "Producto prueba 2", precio: 150, cantidad: 15});
        
        await ped.addProducto(prod);
        await ped.addProducto(prod2);

        const result = await Pedido.findOne({
            where: { id: id_pedido },
            include: Producto
        });
        res.json(result)

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    index,
    store,
    update,
    show,
    destroy,
    compraProductos
}
