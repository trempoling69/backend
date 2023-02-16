const requestStats = require("../../fctUtiles/requestStats");

exports.defaultLink = (req, res) => {
  res.send("private API of Rougy Horticulture");
};

exports.stats = (req, res) => {
  requestStats().then((countAll) => {
    res.json(Object.fromEntries(countAll));
  });
};
