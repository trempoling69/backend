const XLSX = require('xlsx');

const exportxlsx = (res, json, sheets, prices) => {
  const jsonPlantes = JSON.parse(JSON.stringify(json));
  jsonPrices = JSON.parse(JSON.stringify(prices));
  let wb = XLSX.utils.book_new();
  let plantes = { vivaces: [], annuelles: [], arbustes: [], prix: [] };
  let plante = JSON.parse(JSON.stringify(plantes));
  for (let index = 0; index < Object.keys(jsonPlantes).length; index++) {
    if (jsonPlantes[index]['type'] === 'Vivaces') {
      plante['vivaces'].push(jsonPlantes[index]);
    }
    if (jsonPlantes[index]['type'] === 'annuelle') {
      plante['annuelles'].push(jsonPlantes[index]);
    }
    if (jsonPlantes[index]['type'] === 'Arbustes') {
      plante['arbustes'].push(jsonPlantes[index]);
    }
  }
  for (let index = 0; index < Object.keys(prices).length; index++) {
    plante['prix'].push(jsonPrices[index]);
  }
  for (let index = 0; index < sheets.length; index++) {
    ws = XLSX.utils.json_to_sheet(plante[sheets[index]]);
    XLSX.utils.book_append_sheet(wb, ws, sheets[index]);
  }
  excelBuffer = XLSX.writeFile(wb, './bddplantes.xlsx');
  res.download('./bddplantes.xlsx');
};

module.exports = exportxlsx;
