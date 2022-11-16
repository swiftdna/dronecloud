const BookingDroneDetails = async (req, res, next) => {
    const { models: { booking: Booking } } = COREAPP;
    const { internal } = req;
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
    const { models: { booking: Booking } } = COREAPP;
    try {
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
module.exports = {
    BookingDroneDetails,
    getBookings,
    getUserBookings,
};