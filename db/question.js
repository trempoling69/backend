// module.exports = (sequelize, DataTypes) => {
//     const questions = sequelize.define("questions", {
//         id_question : {
//             type: DataTypes.INTEGER,
//             allowNull:false, 
//             autoIncrement: true, 
//             primaryKey: true, 
//             validate:{
//                 notEmpty:true,
//             }
//         }, 
//         texte_question : {
//             type : DataTypes.STRING,
//             allowNull : true
//         }, 
//         reponse_1 : {
//             type : DataTypes.INTEGER, 
//             references: {
//                 model: 'Reponse',
//                 key: 'id_reponse'
//               }
//         },
//         reponse_2 : {
//             type : DataTypes.INTEGER, 
//             references: {
//                 model: 'Reponse',
//                 key: 'id_reponse'
//               }
//         },
//         reponse_3 : {
//             type : DataTypes.INTEGER, 
//             references: {
//                 model: 'Reponse',
//                 key: 'id_reponse'
//               }
//         },
//         reponse_4 : {
//             type : DataTypes.INTEGER, 
//             references: {
//                 model: 'Reponse',
//                 key: 'id_reponse'
//               }
//         },
//         reponse_5 : {
//             type : DataTypes.INTEGER, 
//             references: {
//                 model: 'Reponse',
//                 key: 'id_reponse'
//               }
//         },
//         reponse_6 : {
//             type : DataTypes.INTEGER, 
//             references: {
//                 model: 'Reponse',
//                 key: 'id_reponse'
//               }
//         },
//         start : {
//             type : DataTypes.STRING, 
//             allowNull: true
//         }
//     }, {
//         timestamps : false
//     })
//     return questions
// }