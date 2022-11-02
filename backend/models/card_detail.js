module.exports = function(sequelize, Sequelize) {
    const CardDetail = sequelize.define('card_detail', {
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
        type: {
            type: Sequelize.TEXT
        },
        vendor: {
            type: Sequelize.TEXT
        },
        value: {
            type: Sequelize.TEXT
        },
        expiry_month: {
            type: Sequelize.STRING
        },
        expiry_year: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE
        },
        updated: {
            type: Sequelize.DATE
        }
    });
    return CardDetail;
}