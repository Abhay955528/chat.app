const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const Order = require("./model/order"); 

app.use(bodyParser.json({extented:false}));
const cors = require("cors");
app.use(cors());

const orderRoutes = require('./routes/order')

app.use(orderRoutes);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });


