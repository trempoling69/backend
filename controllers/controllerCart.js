const { Cart } = require('../utils/importbdd');

const getAllCart = (req, res) => {
  Cart()
    .findAll()
    .then((result) => {
      res.json(result);
    });
};

const newCart = (req, res) => {
  const content = req.body.content;
  const totalPrice = req.body.totalPrice;
  const contentString = JSON.stringify(content);
  Cart()
    .create({
      content: contentString,
      totalPrice,
    })
    .then(() => {
      res.status(200).send();
    });
};

const modifyCart = (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  const totalPrice = req.body.totalPrice;
  const contentString = JSON.stringify(content);
  Cart()
    .update(
      {
        content: contentString,
        totalPrice,
      },
      {
        where: {
          id,
        },
      }
    )
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getAllCart, newCart, modifyCart };
