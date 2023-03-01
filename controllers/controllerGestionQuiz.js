const model = require("../db/model");
const Question = model.Question;
const Reponse = model.Reponse;

const getQR = (req, res) => {
  Question.findAll({
    attributes: ["id_question", "texte_question"],
    include: [
      {
        model: Reponse,
        as: "Reponse1",
      },
      {
        model: Reponse,
        as: "Reponse2",
      },
      {
        model: Reponse,
        as: "Reponse3",
      },
      {
        model: Reponse,
        as: "Reponse4",
      },
      {
        model: Reponse,
        as: "Reponse5",
      },
      {
        model: Reponse,
        as: "Reponse6",
      },
    ],
  }).then((question) => {
    res.json(question);
  });
};

const modifQR = (req, res) => {
  let id_question = req.body.id_question;
  let arrayReponses = [
    "Reponse1",
    "Reponse2",
    "Reponse3",
    "Reponse4",
    "Reponse5",
    "Reponse6",
  ];
  Question.update(
    {
      texte_question: req.body.textQuestion,
    },
    {
      where: { id_question: id_question },
    }
  ).then(() => {
    let promises = [];
    arrayReponses.forEach((reponse, index) => {
      let promise = new Promise((resolve, reject) => {
        if (req.body[reponse].id_reponse !== "") {
          console.log("modifier" + req.body[reponse].id_reponse);
          Reponse.update(
            {
              text_reponse: req.body[reponse].textReponse,
              id_question_suivante: parseInt(
                req.body[reponse].id_question_suivante
              ),
              type_tri: req.body[reponse].type_tri,
              colonne_filtre: req.body[reponse].colonne_filtre,
              filtre: req.body[reponse].filtre,
            },
            {
              where: { id_reponse: req.body[reponse].id_reponse },
            }
          ).then(()=>{
            resolve()
          })
          .catch(()=>{
            reject('erreur sql update reponse')
          })
        } else if (
          req.body[reponse].id_reponse === "" &&
          req.body[reponse].textReponse !== ""
        ) {
          console.log("nouveau !" + req.body[reponse]);
          Reponse.create({
            text_reponse: req.body[reponse].textReponse,
            id_question_suivante: parseInt(
              req.body[reponse].id_question_suivante
            ),
            type_tri: req.body[reponse].type_tri,
            colonne_filtre: req.body[reponse].colonne_filtre,
            filtre: req.body[reponse].filtre,
          })
          .then((reponse) => {
            resolve()
            const propretyName = `reponse_${index + 1}`;
            const updateData = {};
            updateData[propretyName] = reponse.dataValues.id_reponse;
            Question.update(updateData, {
              where: { id_question: id_question },
            });
            console.log(reponse.dataValues.id_reponse);
          })
          .catch(()=>{
            reject('erreur sql création réponse')
          })
        } else {
          resolve()
          console.log("Pas intéressant" + req.body[reponse]);
        }
      });
      promises.push(promise);
    });
    Promise.all(promises)
    .then(()=>{
      res.status(200).send()
    })
    .catch((err)=>{
      res.status(400).send(err)
    })
  });
  //console.log(req.body["Reponse1"]);
};

const suppReponse = (req, res) => {
  let id_reponse = req.params.id;
  Reponse.destroy({
    where: { id_reponse: id_reponse },
  }).then(() => {
    res.status(200).send();
  });
};

const suppQuestion = (req, res) => {
  let id_question = req.params.id
  Question.destroy({
    where : {id_question : id_question}
  }).then(()=>{
    res.status(200).send()
  })
  .catch((err)=>{
    res.status(400).send(err)
  })
}

const addQuestion = (req, res) => {
  Question.create().then(()=>{
    res.status(200).send()
  })
  .catch((err)=>{
    res.status(400).send(err)
  })
}
module.exports = { getQR, modifQR, suppReponse, suppQuestion, addQuestion };
