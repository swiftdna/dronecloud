const schedule = require('node-schedule');
const moment = require('moment');

const handleBookingSchedule = () => {
    console.log('Scheduler setup for bookings!');
    schedule.scheduleJob('*/5 * * * *', function(){
        console.log('I will run once in 5 mins and schedule trips in the simulator', moment().format("MMM dd YYYY hh:mm:ss a"));
    });
};

module.exports = {
    handleBookingSchedule
};