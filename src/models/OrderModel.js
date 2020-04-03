module.exports = (db, Sequelize) => {
    return db.define('order', {
        // attributes
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        start_delivery_datetime: {
            type: Sequelize.DATE,
            allowNull: false
        },
        end_delivery_datetime: {
            type: Sequelize.DATE,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            values: ['Ordered', 'Delivered'],
        }
    }, {
        underscored: true
    });
}