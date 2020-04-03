/** Dependencies */
const Sequelize = require('sequelize');

/** Model definitions */
const UserModel = require('../../models/UserModel');
const CustomerDeliveryAddressModel = require('../../models/CustomerDeliveryAddressModel');
const OrderModel = require('../../models/OrderModel');

/** Global variables */
let dbInstance = null;
let models = null;

function initModels(db, Sequelize) {
    /** Init Models */
    const User = UserModel(db, Sequelize);
    const CustomerDeliveryAddress = CustomerDeliveryAddressModel(db, Sequelize);
    //const Driver = DriverModel(db, Sequelize);
    const Order = OrderModel(db, Sequelize);

    /** Make Relations */
    User.hasMany(CustomerDeliveryAddress, { as: "DeliveryAddresses" });
    CustomerDeliveryAddress.hasMany(Order, { as: "Orders" });
    User.hasMany(Order, { as: "Orders", foreignKey: "driver_id" })

    return {
        User,
        CustomerDeliveryAddress,
        Order,
    }
}

function getDatabaseCredentials() {
    const dbName = global.inProduction ? process.env.DB_DEV_NAME : process.env.DB_PRODUCTION_NAME;
    const dbUser = global.inProduction ? process.env.DB_DEV_USER : process.env.DB_PRODUCTION_USER;
    const dbPass = global.inProduction ? process.env.DB_DEV_PASS : process.env.DB_PRODUCTION_PASS;
    const dbHost = global.inProduction ? process.env.DB_DEV_HOST : process.env.DB_PRODUCTION_HOST;
    // const dbPort = global.inProduction ? process.env.DB_DEV_PORT : process.env.DB_PRODUCTION_PORT;

    return {
        dbName,
        dbUser,
        dbPass,
        dbHost,
        //dbPort,
    }
}

async function initDatabaseAndGetModels() {
    const { dbName, dbUser, dbPass, dbHost } = getDatabaseCredentials();

    const db = new Sequelize(dbName, dbUser, dbPass, {
        host: dbHost,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    });

    /** Test connection */
    try {
        await db.authenticate();
        console.log('Database connection has been established successfully.');
        const tempModels = initModels(db, Sequelize);
        if (!global.inProduction) {
            await db.sync({ force: true }); // Sync database with models
            console.log("Database synchronized with models")
        }
        dbInstance = db;
        return tempModels;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        dbInstance = null;
        console.error(error);
    }
}

module.exports = async function () {
    /** Singleton Pattern */
    if (dbInstance === null) {
        models = await initDatabaseAndGetModels();
    }
    return models;
}