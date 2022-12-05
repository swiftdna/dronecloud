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
            drone_id:parseInt(req.body.drone_id),
            land_id:parseInt(req.body.land_id),
            farm_id:req.body.farm_id,
            pilot_id:req.body.pilot_id,
            start_date:req.body.start_date,
            end_date:req.body.end_date,
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
    const { models: { booking: Booking, farm: Farm, land: Land } } = COREAPP;
    const {body: { id, status } } = req;
    const params = {
        user_id: id
    };
    if (status) {
        params.status = status;
    }
    try {
        const userbookings = await Booking.findAll({
            where: params,
            raw: true,
            include: [{
                model: Farm,
                required: false,
                as: 'Farm'
            },
            {
                model: Land,
                required: false,
                as: 'Land'
            }]
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
const fetchNextFiveMinsBookings = async(req, res, next) => {
    const { models: { booking: Booking } } = COREAPP;
    try {
        var currDate = moment().toDate();
        var newDateObj = moment().add(5, 'minutes').toDate();
        console.log('from ', currDate);
        console.log('to ', newDateObj);
        const userbookings = await Booking.findAll({
            where: {
                status: 'booked',
                start_date: {
                    [Op.gte]: currDate,
                    [Op.lte]: newDateObj
                }
            },
            raw: true
        });
        return userbookings
    }
    catch(e) {
        console.log(e)
    }
  }

const updateBookings = async (params) => {
    const { models: { booking: Booking } } = COREAPP;
    const { where } = params;
    if (where) {
        for (let key in where) {
            if (where[key] && where[key].indexOf(',') !== -1) {
                where[key] = {
                    [Op.in]: where[key].split(',')
                }
            }
        }
    }
    try {
        console.log(JSON.stringify(
            {...params.set},
            {where: params.where}
        ));
        const bookings = await Booking.update(
            {...params.set},
            {where: params.where}
        );
        return bookings;
    }
    catch(e) {
        console.log(e)
    }
}


module.exports = {
    BookingDroneDetails,
    getBookings,
    getUserBookings,
    fetchNextFiveMinsBookings,
    updateBookings,
};