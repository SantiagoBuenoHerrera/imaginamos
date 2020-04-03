const userController = require('../../../controllers/userController');

module.exports = async function () {
    const customer = await userController.createCustomer("Santiago", "Espitia Patiño", "santiagoemp01@gmail.com", "3508108761");
    await userController.createCustomerDeliveryAddress(customer.id, "Cra 104 # 65B - 05");
    await userController.createCustomerDeliveryAddress(customer.id, "Calle 69 # 83 - 40");
    await userController.createDriver("Pepito", "Perez", "pepito.perez@gmail.com", "3001231212");
    await userController.createDriver("Valentina", "Buitrago", "vale.bc@gmail.com", "3002333333");
    await userController.createDriver("Juanchito", "Espinoza", "juan.esp@gmail.com", "3508108722");
    console.log('Seeds created successfully')
}