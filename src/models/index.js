const {Sequelize, DataTypes} = require("sequelize");
const db = require("./../database/db");


const Usuario = db.define('Usuario', {
    correo: {
        type: Sequelize.STRING,
        validate: {
            isEmail: {
                msg: "El campo correo debe ser valido"
            },
            notEmpty: {
                msg: "El correo no debe ir vacio"
            }
        },
        unique: {
           args: true,
           msg: "El correo ya existe" 
        },
    },
    password: {
        type: Sequelize.STRING, 
        validate: {
            max: 20            
        }
    },
    activo: {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: true}
},{
    timestamps: true
})

// Persona
const Persona = db.define("Persona", {
    nombres: {type: Sequelize.STRING(50), allowNull: false},
    apellidos: {type: Sequelize.STRING(50), allowNull: false},
    estado: {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: true},
    fecha_nac: DataTypes.DATE,
    usuario_id: {type: Sequelize.INTEGER, references: {model: Usuario, key: 'id'}}

})

//Relacion uno a uno,  entre Usuario y Persona
Usuario.hasOne(Persona, {foreignKey: 'usuario_id'})


const Pedido = db.define("Pedido", {
    fecha: DataTypes.DATE,
    precio_total: DataTypes.DECIMAL(10, 2),
    estado: {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: true},
    
    persona_id: {type: Sequelize.INTEGER, references: {model: Persona, key: 'id'}}

})

//Relacion de uno  a Muchos
Persona.hasMany(Pedido, {foreignKey: 'persona_id'})

//Producto
const Producto = db.define("Producto", {
    titulo: {type: Sequelize.STRING(200), allowNull: false},
    precio: {type: DataTypes.DECIMAL(10, 2)},
    cantidad: {type: DataTypes.INTEGER, defaultValue: 0},
    disponibilidad: {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: true},
    imagen: {type: Sequelize.STRING(200), allowNull: true},
})

//Definir la tabla relación
const PedidoProducto = db.define("pedido_producto");

// Relacion de Muchos a Muchos
Pedido.belongsToMany(Producto, {through: PedidoProducto});
Producto.belongsToMany(Pedido, {through: PedidoProducto});

// Role
const Role = db.define("Role", {
    nombre: {type: Sequelize.STRING(30), allowNull: false},
    detalle: {type: Sequelize.TEXT, allowNull: true}
});

// Role.schema("admin")

//Relacion Muchos a Muchos 2da forma
Usuario.belongsToMany(Role, {through: 'role_user'});
Role.belongsToMany(Usuario, {through: 'role_user'});


module.exports = {
    Usuario,
    Persona,
    Producto,
    Role,
    Pedido
}