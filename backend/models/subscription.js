module.exports = function(sequelize, Sequelize) {
    const Subscription = sequelize.define('subscription', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
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
        }
    });
    return Subscription;
}