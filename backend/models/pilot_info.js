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
        certname: {
            type: Sequelize.TEXT
        },
        certid: {
            type: Sequelize.TEXT
        },
        certexpdate: {
            type: Sequelize.DATEONLY
        },
        pilotcertimg: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.TEXT
        }
    });
    return PilotInfo;
}