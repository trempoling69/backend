const { Order } = require('../utils/importbdd');

const getAllOrder = (req, res) => {
  Order()
    .findAll()
    .then((result) => {
      res.json(result);
    });
};

const newOrder = (req, res) => {
  const content = req.body.content;
  const totalPrice = req.body.totalPrice;
  const contentString = JSON.stringify(content);
  Order()
    .create({
      content: contentString,
      totalPrice,
    })
    .then(() => {
      res.status(200).send();
    });
};

const modifyOrder = (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  const totalPrice = req.body.totalPrice;
  const contentString = JSON.stringify(content);
  Order()
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

module.exports = { getAllOrder, newOrder, modifyOrder };
