const schedule = require('node-schedule');
const { fetchNextFiveMinsBookings, getBookings, updateBookings } = require('./Booking');
const { getLandCoords } = require('./Lands');
const { flysimulatorbooking, checkTripStatus } = require('./SimulatorInteraction');
const _ = require('underscore');

const schedulebookings = async () => {
    const futurebookings = await fetchNextFiveMinsBookings();
    console.log(futurebookings);
    for (let i=0; i < futurebookings.length; i++) {
        const booking = futurebookings[i];
        const {land_id, id, drone_id} = booking;
        const lparams = {
            query: {
                land_id
            },
            internal: true
        };
        const landCoords = await getLandCoords(lparams);
        console.log(landCoords);
        landCoords.map(lc => {
            lc.altitude =  50.00000000005293;
            lc.type = 'SimpleItem';
            return lc;
        });
        const flyParams = {
            body: {
                drone_id,
                plan: {
                    "fileType": "Plan",
                    "mission": {
                        "cruiseSpeed": 15,
                        "hoverSpeed": 5,
                        "items": landCoords
                    }
                },
                service_id: id,
            },
            internal: true
        };
        const flyingdroneresponse = await flysimulatorbooking(flyParams);
        console.log(flyingdroneresponse);
        // Update the table with active status
    }
    const futureBookingIDs = _.pluck(futurebookings, 'id');
    if (futureBookingIDs && futureBookingIDs.length) {
        const updtResults = await updateBookings({
            set: {
                status: 'active'
            },
            where: {
                id: futureBookingIDs.join(','),
                status: 'booked'
            }
        });
        console.log(`Sent ${updtResults.length} bookings to the drone simulator!`);
    } else {
        console.log(`No bookings found schedule!`);
    }
}
const updatebookings = async () => {
    // Get all running status bookings and check their statuses
    const params = {
        query: {
            status: "active"
        },
        internal: true
    };
    try {
        const activeTrips = await getBookings(params);
        const combParams = [];
        for (let i = 0; i < activeTrips.length; i++) {
            const trip = activeTrips[i];
            const statusParams = {
                droneID: trip.drone_id,
                id: trip.id
            }
            combParams.push(() => checkTripStatus(statusParams));
        }
        if (activeTrips.length && combParams.length) {
            // Check status from flight monitor
            const results = await Promise.all(combParams.map(f => f()));
            // Update the results if they are completed
            const completedTripsArr = results.filter(rs => rs.simulated_drone_status === 'available');
            const completedTrips = _.pluck(completedTripsArr, 'serviceID');
            if (completedTrips && completedTrips.length) {
                const updtResults = await updateBookings({
                    set: {
                        status: 'complete'
                    },
                    where: {
                        id: completedTrips.join(','),
                        status: 'active'
                    }
                });
                console.log(`Updated ${updtResults.length} records from the booking table!`);
            } else {
                console.log('No bookings completed for updating.');
            }
        }
    } catch(e) {
        console.log('Scheduler :: updatebooking : check active trips error - ', e.message);
    }

}
const handleBookingSchedule = () => {
    console.log('Scheduler setup for bookings!');
    schedule.scheduleJob('* */5 * * * *', async () => {
        console.log('I will run once in 5 mins and schedule trips in the simulator');
        schedulebookings();
    });

    schedule.scheduleJob('*/5 * * * * *', async () => {
        console.log('I will run once in 5 seconds and update trips status');
        updatebookings();
    });
};


module.exports = {
    handleBookingSchedule
};