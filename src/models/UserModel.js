module.exports = (db, Sequelize) => {
    return db.define('user', {
        // attributes
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        names: {
            type: Sequelize.STRING,
            allowNull: false
        },
        surnames: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM,
            values: ['Customer', 'Driver']
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ],
        underscored: true
    });
}