const model = require("../db/model");
const Quiz = model.Quiz;
const Plante = model.Plante;

const getQR = (req, res) => {
  Quiz.findAll().then((quiz) => {
    res.json(quiz);
  });
};

const getPlante = (req, res) => {
    Plante.findAll({
        attributes : { exclude : ['id_plantes', 'quantiteProd', 'hashPlante']}
    }).then((plantes) => {
        res.json(plantes)
    })
}

module.exports = { getQR, getPlante };
