const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    alloNull: false,
    primaryKey: true,
  },
  amount: Sequelize.INTEGER,
  product:Sequelize.STRING
});

module.exports = Order;
