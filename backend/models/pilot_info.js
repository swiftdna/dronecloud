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
        address: {
            type: Sequelize.TEXT
        },
        contact: {
            type: Sequelize.BIGINT
        },
        issued_by: {
            type: Sequelize.TEXT
        },
        license_number: {
            type: Sequelize.TEXT
        }
    });
    return PilotInfo;
}