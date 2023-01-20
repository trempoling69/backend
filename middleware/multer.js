const multer = require("multer");

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//destination du fichier et generation nom unique

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    //supprimer les espaces
    const name1 = file.originalname.split(" ").join("_");
    const name = name1.split(".").slice(0, -1);
    const extension = MIME_TYPE[file.mimetype];

    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Les seuls formats acceptés sont .png, .jpg and .jpeg"), false);
  }
}
const multerupload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2000000 },
});


//exportation du middleware 
module.exports = multerupload.single('photo');

