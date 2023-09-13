const XLSX = require('xlsx');

const exportxlsx = (res, json, sheets, prices, pots) => {
  console.log(json.length);
  const jsonPlantes = JSON.parse(JSON.stringify(json));
  const jsonPots = JSON.parse(JSON.stringify(pots));
  jsonPrices = JSON.parse(JSON.stringify(prices));
  let wb = XLSX.utils.book_new();
  let plantes = { Vivaces: [], Annuelles: [], Arbustes: [], Prix: [], Pots: [] };
  let plante = JSON.parse(JSON.stringify(plantes));
  for (let index = 0; index < Object.keys(jsonPlantes).length; index++) {
    if (jsonPlantes[index]['type'] === 'Vivace') {
      plante.Vivaces.push(jsonPlantes[index]);
    }
    if (jsonPlantes[index]['type'] === 'Annuelle') {
      plante.Annuelles.push(jsonPlantes[index]);
    }
    if (jsonPlantes[index]['type'] === 'Arbuste') {
      plante.Arbustes.push(jsonPlantes[index]);
    }
  }
  for (let index = 0; index < Object.keys(prices).length; index++) {
    plante.Prix.push(jsonPrices[index]);
  }
  for (let index = 0; index < Object.keys(pots).length; index++) {
    plante.Pots.push(jsonPots[index]);
  }
  for (let index = 0; index < sheets.length; index++) {
    ws = XLSX.utils.json_to_sheet(plante[sheets[index]]);
    XLSX.utils.book_append_sheet(wb, ws, sheets[index]);
  }
  excelBuffer = XLSX.writeFile(wb, './bddplantes.xlsx');
  res.download('./bddplantes.xlsx');
};

module.exports = exportxlsx;
