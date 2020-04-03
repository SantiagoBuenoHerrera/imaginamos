const express = require('express');
const router = express.Router();

/** Controllers */
const orderController = require('../controllers/orderController');
//const customerController = require('../controllers/userController');

/** Create order */
router.post('/new', async (req, res) => {
    const tempOrder = await orderController.create(req.body.startDeliveryDatetime, req.body.endDeliveryDatetime, req.body.customerDeliveryAddress, req.body.customerId);
    const assignedDriver = await orderController.assignRandomDriver(tempOrder.id);
    res.send({
        tempOrder,
        assignedDriver
    });
});


module.exports = router;