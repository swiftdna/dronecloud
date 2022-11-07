module.exports = function(sequelize, Sequelize) {
    const DroneCatalog = sequelize.define('drone_catalog', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.TEXT
        },
        manufacturer: {
            type: Sequelize.TEXT
        },
        model: {
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
       price:{
           type:Sequelize.INTEGER
       },
       time:{
           type:Sequelize.INTEGER
       },
       service:{
           type:Sequelize.TEXT
       },
      
       

    });
    return DroneCatalog;
}