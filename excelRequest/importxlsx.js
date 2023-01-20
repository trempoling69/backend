const XLSX = require('xlsx');

const finalObject = {};

const importxlsx = (workbooks, callback) => {
    const data = XLSX.read(workbooks, { type: 'file' });
    data.SheetNames.forEach(SheetName => {
        let rowObject = XLSX.utils.sheet_to_json(data.Sheets[SheetName])
        finalObject[SheetName] = rowObject;
    })
    callback(finalObject);

};

module.exports = importxlsx;
