// module.exports = (sequelize, DataTypes) => {
//     const reponses = sequelize.define("reponses", {
//         id_reponse:{
//             type: DataTypes.INTEGER,
//             allowNull:false, 
//             autoIncrement: true, 
//             primaryKey: true, 
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         text_reponse : {
//             type : DataTypes.STRING
//         }, 
//         id_question_suivante : {
//             type : DataTypes.INTEGER
//         },
//         type_tri : {
//             type : DataTypes.STRING
//         },
//         colonne_filtre : {
//             type : DataTypes.STRING
//         }, 
//         filtre : {
//             type: DataTypes.STRING
//         }
//     }, {
//         timestamps:false
//     })
//     return reponses
// }