const models = require('../utilities/db');

/** Controllers */
const userController = require('../controllers/userController');

async function create(startDeliveryDatetime, endDeliveryDatetime, customerDeliveryAddress, userId) {
    const { Order } = await models();
    try {
        const tempCustomerDeliveryAddress = await userController.createCustomerDeliveryAddress(userId, customerDeliveryAddress);
        const tempOrder = await Order.create({ start_delivery_datetime: startDeliveryDatetime, end_delivery_datetime: endDeliveryDatetime, status: "Ordered" });
        tempCustomerDeliveryAddress.addOrders([tempOrder.id]);
        return tempOrder;
    } catch (error) {
        console.log(error);
    }
}

async function assignRandomDriver(orderId) {
    const { Order } = await models();
    const tempOrder = await Order.findByPk(orderId);
    const tempDrivers = await userController.findAllDrivers();
    const selectedDriver = tempDrivers[Math.floor(Math.random() * tempDrivers.length)];
    await selectedDriver.addOrders([tempOrder.id]);
    return selectedDriver;
}

module.exports = {
    create,
    assignRandomDriver
}