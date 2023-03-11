// module.exports = (sequelize, DataTypes) => {
//     const plantes = sequelize.define("plantes", {
//         id_plantes:{
//             type: DataTypes.INTEGER,
//             allowNull:false, 
//             autoIncrement: true, 
//             primaryKey: true, 
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         nom:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         description:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         couleur_dispo:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         type:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         feuillage:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         collection:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         exposition:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             validate:{
//                 notEmpty:true,
//             }
//         },
//         hauteur:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         mois_floraison:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         periode_floraison:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         besoin_eau:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         photo:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             validate:{
//                 notEmpty:false,
//             }
//         },
//         dispo:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             defaultValue: 0,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         prix:{
//             type: DataTypes.FLOAT(4),
//             allowNull : true,
//             defaultValue : 0,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         emplacement:{
//             type: DataTypes.STRING,
//             allowNull : false,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         quantiteProd:{
//             type: DataTypes.INTEGER,
//             allowNull : true,
//             // validate:{
//             //     notEmpty:false,
//             // }
//         },
//         catchPhrase:{
//             type: DataTypes.STRING(200),
//             allowNull : true,
//         },
//         hashPlante:{
//             type: DataTypes.STRING(100),
//             allowNull:false,
//             validate:{
//                 notEmpty:true,
//             }
//         }
//     }, {
//         timestamps:false
//     })


//     return plantes;
// }