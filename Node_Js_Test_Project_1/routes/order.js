const exress = require('express');
const router = exress.Router();

const OrderController = require('../controllers/order')

router.post("/user/add-order",OrderController.getAdd)

router.get("/user/get-order", OrderController.getGet)

router.delete('/user/delete-order/:id', OrderController.getDelete)


module.exports = router;
