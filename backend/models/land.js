module.exports = function(sequelize, Sequelize) {
    const Farm = sequelize.define('land', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        farm_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'farms',
                key: 'id'
            }
        },
        name: {
            type: Sequelize.TEXT
        },
        address: {
            type: Sequelize.TEXT
        },
        location_lat: {
            type: Sequelize.FLOAT
        },
        location_lng: {
            type: Sequelize.FLOAT
        }
    });
    return Farm;
}