const Order = require("../model/order");

const getAdd = async (req, res, next) => {
  try {
    const Amount = req.body.price;
    const Product = req.body.product;

    const uId = await Order.create({
      amount: Amount,
      product: Product,
    });

    res.status(201).json({ newOrder: uId });
  } catch (error) {
    res.status(500).json({
        err:error
    })
  }
};
const getGet = async (req, res, next) => {
  try {
    const order = await Order.findAll();
    res.status(200).json({ allOrder: order });
  } catch (error) {
    console.log('Get order is falling',JSON.stringify(error));
    res.status(500).json({error:error});
  }
};
const getDelete = async (req, res, next) => {
  try {
    const uId = req.params.id;
    console.log(uId);
    await Order.destroy({ where: { id: uId } });
    res.sendStatus(200);
  } catch (error) {
    res.Status(500).json(error);
  }
};

module.exports = {
  getAdd,
  getGet,
  getDelete,
};
