module.exports = function(sequelize, Sequelize) {
    const Subscription = sequelize.define('subscription', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        billing_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'billings',
                key: 'id'
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        next_sub_date: {
            type: Sequelize.DATE
        },
        created: {
            type: Sequelize.DATE
        },
        updated: {
            type: Sequelize.DATE
        }
    });
    return Subscription;
}