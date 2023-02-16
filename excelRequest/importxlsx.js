const XLSX = require('xlsx');



const importxlsx = (workbooks, callback) => {
    const finalObject = {};
    const data = XLSX.read(workbooks, { type: 'buffer' });
    data.SheetNames.forEach(SheetName => {
        let rowObject = XLSX.utils.sheet_to_json(data.Sheets[SheetName])
        finalObject[SheetName] = rowObject;
    })
    callback(finalObject);

};

module.exports = importxlsx;