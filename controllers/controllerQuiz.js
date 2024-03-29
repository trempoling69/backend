const { Question, Reponse, Plante } = require('../utils/importbdd');

const getQR = (req, res) => {
  Question()
    .findAll({
      attributes: ['id', 'texte_question', 'start'],
      include: [
        {
          model: Reponse(),
          as: 'Reponse1',
        },
        {
          model: Reponse(),
          as: 'Reponse2',
        },
        {
          model: Reponse(),
          as: 'Reponse3',
        },
        {
          model: Reponse(),
          as: 'Reponse4',
        },
        {
          model: Reponse(),
          as: 'Reponse5',
        },
        {
          model: Reponse(),
          as: 'Reponse6',
        },
      ],
    })
    .then((question) => {
      res.json(question);
    });
};

const getPlante = (req, res) => {
  Plante()
    .findAll({
      attributes: { exclude: ['id_plantes', 'quantiteProd', 'hashPlante'] },
    })
    .then((plantes) => {
      res.json(plantes);
    });
};

module.exports = { getQR, getPlante };
