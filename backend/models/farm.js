module.exports = function(sequelize, Sequelize) {
    const Farm = sequelize.define('farm', {
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
        name: {
            type: Sequelize.TEXT
        },
        address: {
            type: Sequelize.TEXT
        }
    });
    return Farm;
}