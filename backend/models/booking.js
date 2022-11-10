module.exports = function(sequelize, Sequelize) {
    const Booking = sequelize.define('booking', {
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
        drone_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'drones',
                key: 'id'
            }
        },
        land_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'lands',
                key: 'id'
            }
        },
        farm_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'farms',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING,
        },
        pilot_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        }
    });
    return Booking;
}