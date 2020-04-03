module.exports = (db, Sequelize) => {
    return db.define('customer_delivery_address', {
        // attributes
        delivery_address: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        underscored: true
    });
}