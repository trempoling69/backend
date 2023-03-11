// module.exports = (sequelize, DataTypes) => {
//     const quiz = sequelize.define("quiz", {
//         id_questions:{
//             type: DataTypes.INTEGER,
//             allowNull:false, 
//             autoIncrement: true, 
//             primaryKey: true, 
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         questions:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         reponse_un:{
//             type: DataTypes.STRING,
//             allowNull : true,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         reponse_deux:{
//             type: DataTypes.STRING,
//             allowNull : true,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         reponse_trois:{
//             type: DataTypes.STRING,
//             allowNull : true,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         reponse_quatre:{
//             type: DataTypes.STRING,
//             allowNull : true,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         reponse_cinq:{
//             type: DataTypes.STRING,
//             allowNull : true,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         reponse_six:{
//             type: DataTypes.STRING,
//             allowNull : true,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//     }, {
//         timestamps:false,
//         freezeTableName: true
//     })
//     return quiz;
// }