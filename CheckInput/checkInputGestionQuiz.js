const checkInputGestionQuiz = (donnee, callback) => {
  let checkInput = {};
  let arrayReponses = [
    "Reponse1",
    "Reponse2",
    "Reponse3",
    "Reponse4",
    "Reponse5",
    "Reponse6",
  ];
  let type_tri = ["STRICT", "STRING_MULTI", "INT_AVG", "AUCUN"];
  checkInput.id_question = parseInt(donnee.id_question);
  if (isNaN(checkInput.id_question)) {
    return;
  }
  checkInput.textQuestion = donnee.textQuestion.replace(/[<>]/g, "");
  arrayReponses.forEach((reponse) => {
    checkInput[reponse] = {}
    checkInput[reponse].id_reponse = parseInt(donnee[reponse].id_reponse);
    checkInput[reponse].textReponse = donnee[reponse].textReponse.replace(
      /[<>]/g,
      ""
    );
    checkInput[reponse].id_question_suivante = parseInt(
      donnee[reponse].id_question_suivante
    );
    if (type_tri.includes(donnee[reponse].type_tri)) {
      checkInput[reponse].type_tri = donnee[reponse].type_tri;
    }
    checkInput[reponse].colonne_filtre = donnee[reponse].colonne_filtre.replace(
      /[<>]/g,
      ""
    );
    checkInput[reponse].filtre = donnee[reponse].filtre.replace(/[<>]/g, "");
  });
  callback(checkInput)
};

module.exports = { checkInputGestionQuiz };
