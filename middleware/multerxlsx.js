const multer = require("multer");

const storage = multer.memoryStorage();
const uploadxlsx = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("ERREUR : Il faut un fichier au format XLSX"), false);
    }
  },
});

module.exports = uploadxlsx.single('importXls');