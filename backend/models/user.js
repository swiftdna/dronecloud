module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.TEXT
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        role: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        name: {
            type: Sequelize.TEXT
        },
        phone: {
            type: Sequelize.TEXT
        },
        address: {
            type: Sequelize.TEXT
        },
        city: {
            type: Sequelize.TEXT
        },
        state: {
            type: Sequelize.TEXT
        },
        country: {
            type: Sequelize.TEXT
        },
        zipcode: {
            type: Sequelize.INTEGER
        },
        driverlicense: {
            type: Sequelize.TEXT
        },
        imageurl: {
            type: Sequelize.TEXT
        },
        licenseimageurl: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.TEXT
        }
    });
    return User;
}