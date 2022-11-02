module.exports = function(sequelize, Sequelize) {
    const PilotInfo = sequelize.define('pilot_info', {
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
        issued_by: {
            type: Sequelize.TEXT
        },
        license_number: {
            type: Sequelize.TEXT
        },
        created: {
            type: Sequelize.DATE
        },
        updated: {
            type: Sequelize.DATE
        }
    });
    return PilotInfo;
}