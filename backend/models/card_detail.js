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
        nameoncard: {
            type: Sequelize.STRING
        },

        cardnumber: {
            type: Sequelize.INTEGER
        },
        expiry_month: {
            type: Sequelize.INTEGER
        },
        expiry_year: {
            type: Sequelize.INTEGER
        },
        cvv: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.TEXT
        }
    });
    return CardDetail;
}