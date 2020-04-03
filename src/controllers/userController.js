const models = require('../utilities/db');

async function findAllDrivers() {
    const { User } = await models();
    try {
        const users = await User.findAll({ where: { type: "Driver" } });
        //return JSON.stringify(users, null, 4)
        return users;
    } catch (error) {
        throw error;
    }
}

async function findById(id) {
    const { User } = await models();
    try {
        const tempUser = await User.findByPk(id);
        return tempUser;
    } catch (error) {
        throw error;
    }
}

async function findDeliveryAdressById(id) {
    try {
        const { CustomerDeliveryAddress } = await models();
        const customerDeliveryAddress = await CustomerDeliveryAddress.findByPk(id);
        return customerDeliveryAddress;
    } catch (error) {
        throw error;
    }
}


async function createUser(names, surnames, email, phone, type) {
    const { User } = await models();
    try {
        const user = await User.create({ names, surnames, email, phone, type });
        return user;
    } catch (error) {
        throw error;
    }
}

async function createCustomer(names, surnames, email, phone) {
    try {
        const customer = await createUser(names, surnames, email, phone, "Customer");
        return customer;
    } catch (error) {
        throw error;
    }
}

async function createCustomerDeliveryAddress(customerId, customerDeliveryAddress) {
    const { CustomerDeliveryAddress } = await models();
    const tempCustomer = await findById(customerId);
    const tempCustomerDeliveryAddress = await CustomerDeliveryAddress.findOrCreate(
        {
            where: {
                delivery_address: customerDeliveryAddress,
                user_id: tempCustomer.id
            },
            defaults: {
                delivery_address: customerDeliveryAddress
            }
        });
    await tempCustomer.addDeliveryAddresses([tempCustomerDeliveryAddress[0].dataValues.id]);
    return tempCustomerDeliveryAddress[0];
}

async function createDriver(names, surnames, email, phone) {
    try {
        const tempDriver = await createUser(names, surnames, email, phone, "Driver");
        return tempDriver;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findAllDrivers,
    findById,
    findDeliveryAdressById,
    createCustomer,
    createCustomerDeliveryAddress,
    createDriver
}