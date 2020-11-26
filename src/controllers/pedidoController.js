
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
        let id_pedido = req.params.id;

        const result = await Pedido.findOne({
            where: { id: id_pedido },
            include: Producto
        });
        res.json(result)
        
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

const nuevoPedido = async (req, res) => {
    try {
        //Verificar el usuario actual

        //Primero obtener el (id_persona) o id_usuario
        let persona_id = req.body.persona_id;  // obtener de la sesion actual

        //Procesar los datos y validar
        let ped = {
            fecha: req.body.fecha, // generar fecha y hora del servidor
            precio_total: 0, // modificar una vez que se registre el producto
            estado: false, // cambiar cuando se culmine el pedido
            persona_id: persona_id
        }
        
        let pedido = await Pedido.create(ped);

        let lista_productos = req.body.productos;
        // Recorriendo y registrando los productos a un pedido
        lista_productos.forEach(async (prod) => {
            
            const producto = await Producto.findOne({where: {id: prod}});
            //verificamos la disponibilidad del producto

            // agreamos el producto a la tabla relacion (n:m) (carrito)
            await pedido.addProducto(producto); // necesitamos registrar la cantidad de compra
        });
        
        res.json({mensaje: "Pedido registrado correctamente"})        

    } catch (error) {
        console.log(error)
        res.json({mensaje: "Ocurrio un problema al realizar el pedido"}) 
    }

}

module.exports = {
    index,
    store,
    update,
    show,
    destroy,
    nuevoPedido
}
