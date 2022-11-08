module.exports = function(sequelize, Sequelize) {
    const Drone = sequelize.define('drone', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        manufacturer: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.INTEGER
        },
        equipment: {
            type: Sequelize.TEXT
        },
        service: {
            type: Sequelize.TEXT
        },
        model: {
            type: Sequelize.TEXT
        },
        last_seen_lat: {
            type: Sequelize.FLOAT
        },
        last_seen_lng: {
            type: Sequelize.FLOAT
        },
        last_seen_alt: {
            type: Sequelize.INTEGER
        },
        distance_flown: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.TEXT
        },
        camera:{
            type: Sequelize.TEXT
        },
        speed:{
            type:Sequelize.INTEGER
        },
        weight: {
            type:Sequelize.INTEGER
        },
        time:{
            type:Sequelize.INTEGER
        },
        image_url: {
            type:Sequelize.TEXT
        }
    });
    return Drone;
}