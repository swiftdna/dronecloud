module.exports = function(sequelize, Sequelize) {
    const Land = sequelize.define('land', {
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
        // farm_id: {
        //     type: Sequelize.INTEGER,
        //     references: {
        //         model: 'farms',
        //         key: 'id'
        //     }
        // },
        name: {
            type: Sequelize.TEXT
        },
        type: {
            type: Sequelize.TEXT
        },
        location_lat: {
            type: Sequelize.FLOAT
        },
        location_lng: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.TEXT
        }
    });
    return Land;
}