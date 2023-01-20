const checkuserInputAdd = (req, rowbddtype, res, callback) => {
  console.log(req.body);
  let entervalue = new Map([]);
  let errorLenght = false;
  let errorType = false;
  let errorKeyWords = false;
  let errorMessage = "";
  for (var key in rowbddtype) {
    //console.log(req.body[key]); //Donne le contenue de chaque input
    if (req.body[key] == "undefined" || req.body[key].length == 0) {
      entervalue.set(key, "null");
    }
    for (var keyy in rowbddtype[key]) {
      if (errorLenght || errorType || errorKeyWords) {
        break;
      } else {
        var value = rowbddtype[key][keyy];
        //console.log(keyy);

        //check Lenght
        if (keyy == "length" && req.body[key].length > parseInt(value)) {
          console.log(parseInt(value));
          console.log(req.body[key].length < parseInt(value));
          console.log("trop long");
          errorLenght = true;
          errorMessage = `erreur données ""${key}"" trop long maximum ${value} caractères`;
        }
        //Check KeyWord
        if (keyy == "valeurs" && req.body[key] != "") {
          console.log(value);
          if (value.includes(req.body[key])) {
          } else {
            errorKeyWords = true;
            errorMessage = `erreur données ""${key}"" valeurs acceptées [${value}]`;
          }
        }
        //check Type
        if (value == "int" && req.body[key] != "") {
          entervalue.set(key, parseInt(req.body[key].replace(/[<>]/g, "")));
        } else if (value == "float" && req.body[key] != "") {
          entervalue.set(key, parseFloat(req.body[key].replace(/[<>]/g, "")));
        } else if (value == "string" && req.body[key] != "") {
          entervalue.set(key, req.body[key].replace(/[<>]/g, ""));
        }

        if ((value == "int" || value == "float") && isNaN(entervalue.get(key))) {
          console.log(entervalue.get(key));
          errorType = true;
          errorMessage = `erreur données ""${key}"" type attendu {${value}}`;
        }
      }
    }
  }
  if (errorKeyWords || errorLenght || errorType) {
    res.send(errorMessage);
  } else {
    callback(entervalue);
  }
  // console.log(entervalue);
};
module.exports = checkuserInputAdd;
