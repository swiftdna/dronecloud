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
        console.log(userbookings)
        console.log(currDate,newDateObj)
        // const x = {
        //     droneid:"1",
        //     serviceid:"22",
        //     plan:{"fileType":"Plan","mission":{"cruiseSpeed":15,"hoverSpeed":5,"items":[{"altitude":50.00000000005293,"latitude":37.558605,"longitude":-122.04754200000004,"type":"SimpleItem"},{"altitude":49.99999999958835,"latitude":37.55864599999999,"longitude":-122.04716700000002,"type":"SimpleItem"},{"altitude":50.00000000023102,"latitude":37.55854299999999,"longitude":-122.04714700000001,"type":"SimpleItem"},{"altitude":50.00000000013322,"latitude":37.55850099999999,"longitude":-122.04753699999999,"type":"SimpleItem"},{"altitude":49.99999999947457,"latitude":37.55857599999999,"longitude":-122.04759100000001,"type":"SimpleItem"},{"altitude":14.99999999988875,"latitude":37.55835499999999,"longitude":-122.047656,"type":"SimpleItem"},{"altitude":14.99999999990697,"latitude":37.558277999999994,"longitude":-122.04764200000001,"type":"SimpleItem"},{"altitude":14.999999999058375,"latitude":37.55827200000002,"longitude":-122.04751300000001,"type":"SimpleItem"},{"altitude":14.999999999587114,"latitude":37.558371999999984,"longitude":-122.047544,"type":"SimpleItem"},{"altitude":14.999999999485869,"latitude":37.558385999999985,"longitude":-122.047313,"type":"SimpleItem"},{"altitude":15.00000000058955,"latitude":37.558317,"longitude":-122.04730100000003,"type":"SimpleItem"},{"altitude":14.99999999915223,"latitude":37.558319,"longitude":-122.04721900000001,"type":"SimpleItem"},{"altitude":14.999999998778456,"latitude":37.5584,"longitude":-122.047232,"type":"SimpleItem"}]}}
        // }
        
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