module.exports = function(sequelize, Sequelize) {
    const Billing = sequelize.define('billing', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        booking_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'bookings',
                key: 'id'
            }
        },
        payment_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'card_details',
                key: 'id'
            }
        },
        amount: {
            type: Sequelize.FLOAT
        },
        sub_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'subscriptions',
                key: 'id'
            }
        },
        created: {
            type: Sequelize.DATE
        },
        updated: {
            type: Sequelize.DATE
        }
    });
    return Billing;
}