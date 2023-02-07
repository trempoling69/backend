const { Op } = require("sequelize");
const model = require("../db/model");
const User = model.User;
const Plante = model.Plante;


const counteverything = async () =>{
    var countAll = new Map([]);
    await Plante.count({
      where: {
        type: {
          [Op.like]: "Vivaces",
        },
      },
    }).then((count) => {
      countAll.set("vivaces", count);
    });
    await Plante.count({
      where: {
        type: {
          [Op.like]: "annuelle",
        },
      },
    }).then((count) => {
      countAll.set("Annuelles", count);
    });
    await Plante.count({
      where: {
        type: {
          [Op.like]: "Arbustes",
        },
      },
    }).then((count) => {
      countAll.set("Arbustes", count);
    });
    await Plante.count({
    }).then((count) => {
      countAll.set("Plantes", count);
    });
    await Plante.count({
      where: {
        dispo: {
          [Op.like]: "InStock",
        },
      },
    }).then((count) => {
      countAll.set("InStock", count);
    });
    await Plante.count({
      where: {
        dispo: {
          [Op.like]: "OutStock",
        },
      },
    }).then((count) => {
      countAll.set("OutStock", count);
    });
    await User.count({
  
    }).then((count)=>{
      countAll.set("user", count)
    })
    
    return countAll
  }

  module.exports = counteverything;