const checkuserInputAdd = (req, rowbddtype, res, callback) => {
  let notcheckvalue = new Map([]);
  let entervalue = new Map([]);
  let errorLenght = false;
  let errorType = false;
  let errorKeyWords = false;
  let errorNotNull = false;
  let errorMessage = "";
  for (var key in rowbddtype) {
    if (req[key] == undefined || req[key] === "") {
      if(rowbddtype[key]["notNull"]){
        errorNotNull = true
        errorMessage = `erreur sur le champs : ""${key}"" il ne peut pas être null dans ${JSON.stringify(req)} \n`;
      }else{
        notcheckvalue.set(key, "null");
      }
      
    } else {
      notcheckvalue.set(key, req[key]);
    }
  }
  for (var key in rowbddtype) {
    //console.log(req[key]); //Donne le contenue de chaque input
    if (notcheckvalue.get(key) == "null") {
      entervalue.set(key, "null");
    }
    for (var keyy in rowbddtype[key]) {
      if (errorLenght || errorType || errorKeyWords || errorNotNull) {
        break;
      } else {
        var value = rowbddtype[key][keyy];
        //console.log(keyy);

        //check Lenght
        if (
          keyy == "length" &&
          notcheckvalue.get(key).length > parseInt(value)
        ) {
          errorLenght = true;
          errorMessage = `erreur sur le champs : ""${key}"" trop long maximum ${value} caractères pour [${notcheckvalue.get("nom")}] \n`;
        }
        //Check KeyWord
        if (
          keyy == "valeurs" &&
          (notcheckvalue.get(key) != "null" || entervalue.get(key) != "null")
        ) {
          if (value.includes(notcheckvalue.get(key))) {
          } else {
            errorKeyWords = true;
            errorMessage = `erreur sur le champs : ""${key}"" valeurs acceptées [${value}] pour [${notcheckvalue.get("nom")}] \n`;
          }
        }
        //check Type
        if (value == "int" && entervalue.get(key) != "null") {
          entervalue.set(
            key,
            parseInt(notcheckvalue.get(key))
          );
        } else if (value == "float" && entervalue.get(key) != "null") {
          entervalue.set(
            key,
            parseFloat(notcheckvalue.get(key))
          );
        } else if (value == "string" && entervalue.get(key) != "null") {
          entervalue.set(key, notcheckvalue.get(key).replace(/[<>]/g, ""));
        }

        if (
          (value == "int" || value == "float") &&
          isNaN(entervalue.get(key))
        ) {
          errorType = true;
          console.log(
            `erreur sur le champs : ""${key}"" type attendu {${value}} \n`
          );
          errorMessage = `erreur sur le champs : ""${key}"" type attendu {${value}} pour  [${notcheckvalue.get("nom")}] \n`;
        }
      }
    }
  }
  if (errorKeyWords || errorLenght || errorType || errorNotNull) {
    res.write(errorMessage);
    return true;
  } else {
    callback(entervalue);
  }
};
module.exports = checkuserInputAdd;
