const model = require("../db/model");

exports.bddPlante = () =>{
    return model.Plante
}

exports.bddUser = () => {
    return model.User
}

exports.configBdd = () => {
    let configDonneeBdd = {
        nom: {
          type: "string",
          length: "200",
          notNull: true,
        },
        description: {
          type: "string",
          length: "5000",
          notNull: true,
        },
        couleur_dispo: {
          type: "string",
          length: "1000",
        },
        type: {
          type: "string",
          length: "50",
          valeurs: ["Vivaces", "annuelle", "Arbustes"],
          notNull: true,
        },
        feuillage: {
          type: "string",
          length: "40",
          valeurs: ["caduque", "persistant", "null"],
        },
        collection: {
          type: "string",
          length: "100",
        },
        exposition: {
          type: "string",
          length: "50",
          valeurs: ["Mi-Ombre", "Ombre", "Soleil", "Polyvalente", "null"],
        },
        hauteur: {
          type: "string",
          length: "20",
        },
        mois_floraison: {
          type: "string",
          length: "100",
        },
        periode_floraison: {
          type: "string",
          length: "20",
          valeurs: ["été", "printemps", "automne", "hiver"],
        },
        besoin_eau: {
          type: "string",
          length: "50",
          valeurs: ["un_peu", "beaucoup", "moyen"],
        },
        photo: {
          type: "string",
          length: "100",
        },
        dispo: {
          type: "string",
          length: "20",
          valeurs: ["InStock", "OutStock"],
        },
        prix: {
          type: "float",
          length: "20",
        },
        emplacement: {
          type: "string",
          length: "50",
        },
        quantiteProd: {
          type: "int",
          length: "11",
        },
        catchPhrase: {
          type: "string",
          length: "200",
        },
      };
    return configDonneeBdd
}