const moment = require('moment');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const BookingDroneDetails = async (req, res, next) => {
    const { models: { booking: Booking } } = COREAPP;
    const { internal } = req;
    console.log(req.body)
    try {
        const bookingData = await Booking.create({
            user_id:req.body.user_id,
            drone_id:req.body.drone_id,
            land_id:req.body.land_id,
            farm_id:req.body.farm_id,
            pilot_id:req.body.pilot_id,
            start_date:req.body.start_date,
            end_date:req.body.end_dates,
            status:req.body.status,
            service:req.body.service,
            farmland:req.body.landtype,
            landtype:req.body.landtype,
        });
        if (internal) {
            return bookingData;
        }
        req.model = {};
        req.model.data = {
            sucess: true,
            data: bookingData
        };
        return next();
    }
    catch(e) {
        console.log('error for drones data',e.message);
        return next();
    }
};

const getBookings = async(req, res, next) => {
    const { models: { booking: Booking } } = COREAPP;
    const { internal, query } = req;
    console.log('query -> ', query);
    try {
        const bookingData = await Booking.findAll({
            where: {
                ...query
            },
            raw: true
        });
        if (internal) {
            return bookingData;
        }
        req.model.data = {
            sucess: true,
            data: bookingData
        };
        return next();
    }
    catch(e) {
        req.model.data = {
            sucess: false,
            data: {
                message: e.message
            }
        };
        return next();
    }
}
const getUserBookings = async(req, res, next) => {
    const { models: { booking: Booking } } = COREAPP;
    console.log()
    try {
        console.log("999qwerwerwer9")
        console.log(req.body.id);
        const userbookings = await Booking.findAll({
            where:{
                user_id: req.body.id
            },
            raw: true
        });
        req.model = {};
        req.model.data = {
            sucess: true,
            data: userbookings
        };
        //console.log(req.model.data)
        return next();
    }
    catch(e) {
        req.model.data = {
            sucess: false,
            data: {
                message: e.message
            }
        };
        return next();
    }
}
const BookingDroneScheduler = async(req, res, next) => {
    const { models: { booking: Booking } } = COREAPP;

    try {
        var currDate = moment().toDate();
        var newDateObj = moment().add(5, 'minutes').toDate();
        console.log("time now",currDate,"time in 5 mins",newDateObj)

        const userbookings = await Booking.findAll({
            where:{
                status: 'booked',
                start_date:{
                    [Op.gte]: currDate,
                    [Op.lte]: newDateObj
                }
            },
          
            raw: true
        });
        // console.log("boooookings",userbookings)
        // console.log(currDate,newDateObj)
 
        
        return userbookings
        
    }
    catch(e) {
        console.log(e)
    }
  }

module.exports = {
    BookingDroneDetails,
    getBookings,
    getUserBookings,
    BookingDroneScheduler,
};