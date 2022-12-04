module.exports = function(sequelize, Sequelize) {
    const Land = sequelize.define('land_coord', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        land_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'lands',
                key: 'id'
            }
        },
        location_lat: {
            type: Sequelize.DOUBLE
        },
        location_lng: {
            type: Sequelize.DOUBLE
        }
    });
    return Land;
}