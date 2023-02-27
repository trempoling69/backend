module.exports = (sequelize, DataTypes) => {
    const logininformation = sequelize.define("logininformations",{
        id_user:{
            type: DataTypes.INTEGER,
            allowNull:false, 
            autoIncrement: true, 
            primaryKey: true, 
            validate:{
                notEmpty:true,
            }
        },  
        username:{
            type: DataTypes.STRING,
            allowNull:false, 
            validate:{
                notEmpty:true,
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false, 
            validate:{
                notEmpty:true,
            }
        },
        lastConn:{
            type: DataTypes.STRING,
            allowNull:true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue : "basique",
            validate:{
                notEmpty:true,
            }
        }
    }, {
        timestamps:true
    })

    return logininformation;
}