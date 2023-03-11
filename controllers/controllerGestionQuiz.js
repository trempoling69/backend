const { Question, Reponse, Plante } = require("../utils/importbdd");

const {
  checkInputGestionQuiz,
} = require("../CheckInput/checkInputGestionQuiz");
const getQR = (req, res) => {
  Question()
    .findAll({
      logging: false,
      order: [["id", "ASC"]],
      attributes: ["id", "texte_question", "start"],
      include: [
        {
          model: Reponse(),
          as: "Reponse1",
        },
        {
          model: Reponse(),
          as: "Reponse2",
        },
        {
          model: Reponse(),
          as: "Reponse3",
        },
        {
          model: Reponse(),
          as: "Reponse4",
        },
        {
          model: Reponse(),
          as: "Reponse5",
        },
        {
          model: Reponse(),
          as: "Reponse6",
        },
      ],
    })
    .then((question) => {
      res.json(question);
    });
};

const modifQR = (req, res) => {
  checkInputGestionQuiz(req.body, (checkedInput) => {
    let id_question = checkedInput.id_question;
    let arrayReponses = [
      "Reponse1",
      "Reponse2",
      "Reponse3",
      "Reponse4",
      "Reponse5",
      "Reponse6",
    ];
    Question()
      .update(
        {
          texte_question: checkedInput.textQuestion,
        },
        {
          where: { id: id_question },
        }
      )
      .then(() => {
        let promises = [];
        arrayReponses.forEach((reponse, index) => {
          let promise = new Promise((resolve, reject) => {
            if (!isNaN(checkedInput[reponse].id_reponse)) {
              console.log("modifier" + checkedInput[reponse].id_reponse);
              Reponse()
                .update(
                  {
                    text_reponse: checkedInput[reponse].textReponse,
                    id_question_suivante: parseInt(
                      checkedInput[reponse].id_question_suivante
                    ),
                    type_tri: checkedInput[reponse].type_tri,
                    colonne_filtre: checkedInput[reponse].colonne_filtre,
                    filtre: checkedInput[reponse].filtre,
                  },
                  {
                    where: { id: checkedInput[reponse].id_reponse },
                  }
                )
                .then(() => {
                  resolve();
                })
                .catch(() => {
                  reject("erreur sql update reponse");
                });
            } else if (
              isNaN(checkedInput[reponse].id_reponse) &&
              checkedInput[reponse].textReponse !== ""
            ) {
              console.log("nouveau !" + checkedInput[reponse]);
              Reponse()
                .create({
                  text_reponse: checkedInput[reponse].textReponse,
                  id_question_suivante: parseInt(
                    checkedInput[reponse].id_question_suivante
                  ),
                  type_tri: checkedInput[reponse].type_tri,
                  colonne_filtre: checkedInput[reponse].colonne_filtre,
                  filtre: checkedInput[reponse].filtre,
                })
                .then((reponse) => {
                  resolve();
                  const propretyName = `reponse_${index + 1}`;
                  const updateData = {};
                  updateData[propretyName] = reponse.dataValues.id;
                  Question().update(updateData, {
                    where: { id: id_question },
                  });
                  console.log(reponse.dataValues.id);
                })
                .catch(() => {
                  reject("erreur sql création réponse");
                });
            } else {
              resolve();
              console.log("Pas intéressant" + checkedInput[reponse]);
            }
          });
          promises.push(promise);
        });
        Promise.all(promises)
          .then(() => {
            res.status(200).send();
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      });
  });
};

const suppReponse = (req, res) => {
  let id_reponse = req.params.id;
  Reponse()
    .destroy({
      where: { id: id_reponse },
    })
    .then(() => {
      res.status(200).send();
    });
};

const suppQuestion = (req, res) => {
  let id_question = req.params.id;
  Question()
    .findOne({
      where: { id: id_question },
    })
    .then((question) => {
      if (question.question_1 !== null) {
        Reponse().destroy({
          where: { id: question.reponse_1 },
        });
      }

      if (question.question_2 !== null) {
        Reponse().destroy({
          where: { id: question.reponse_2 },
        });
      }

      if (question.question_3 !== null) {
        Reponse().destroy({
          where: { id: question.reponse_3 },
        });
      }

      if (question.question_4 !== null) {
        Reponse().destroy({
          where: { id: question.reponse_4 },
        });
      }

      if (question.question_5 !== null) {
        Reponse().destroy({
          where: { id: question.reponse_5 },
        });
      }

      if (question.question_6 !== null) {
        Reponse().destroy({
          where: { id: question.reponse_6 },
        });
      }
      Question().destroy({
        where: { id: id_question },
      });
      res.status(200).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const addQuestion = (req, res) => {
  Question()
    .create()
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const changeStart = (req, res) => {
  Question()
    .update(
      {
        start: "false",
      },
      {
        where: { start: "true" },
      }
    )
    .then((result) => {
      Question()
        .update(
          {
            start: "true",
          },
          {
            where: { id: req.params.id },
          }
        )
        .then((result) => {
          res.status(200).send();
        });
    });
};

const getAllColonnes = (req, res) => {
  Plante()
    .describe()
    .then((description) => {
      res.send(Object.keys(description));
    });
};

const getAllPossibleValue = (req, res) => {
  let colonne = req.params.colonne;
  Plante().findAll({
    attributes: [colonne],
    group: [colonne],
  }).then((result) => {
    res.send(result);
  });
};
module.exports = {
  getQR,
  modifQR,
  suppReponse,
  suppQuestion,
  addQuestion,
  changeStart,
  getAllColonnes,
  getAllPossibleValue,
};
