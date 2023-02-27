const requestStats = require("../fctUtiles/requestStats");


const stats = (req, res) => {
  requestStats().then((countAll) => {
    res.json(Object.fromEntries(countAll));
  });
};

module.exports = {stats}
