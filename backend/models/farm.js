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
        },
        lat: {
            type: Sequelize.FLOAT
        },
        lng: {
            type: Sequelize.FLOAT
        },
        ownername: {
            type: Sequelize.TEXT
        },
        area: {
            type: Sequelize.INTEGER
        },
        issuedate: {
            type: Sequelize.DATEONLY
        },
        imageurl: {
            type: Sequelize.TEXT
        },
        utilbillid: {
            type: Sequelize.TEXT
        },
        billdate: {
            type: Sequelize.DATEONLY
        },
        billimgurl: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.TEXT
        },
        type: {
            type: Sequelize.TEXT
        }
    });
    return Farm;
}