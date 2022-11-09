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

module.exports = {
    BookingDroneDetails,
    getBookings,
};