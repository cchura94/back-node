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

//Relacion entre Usuario y Persona
Usuario.hasOne(Persona, {foreignKey: 'usuario_id'})


const Pedido = db.define("Pedido", {
    fecha: DataTypes.DATE,
    precio_total: DataTypes.DECIMAL(10, 2),
    estado: {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: true},
    
    persona_id: {type: Sequelize.INTEGER, references: {model: Persona, key: 'id'}}

})

Persona.hasMany(Pedido, {foreignKey: 'persona_id'})


module.exports = {
    Usuario,
    Persona
}