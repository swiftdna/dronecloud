const sequelize = require('sequelize')
const Op = sequelize.Op

const getDroneDetails = async (req, res, next) => {
    const { models: { drone: Drone } } = COREAPP;
    try {
		const droneData = await Drone.findAll({
		});
        req.model = {};
        req.model.data = droneData;
        //console.log(req.model.data)
        return next();
    }
    catch {
        console.log('error for drones data');
        return next();
    }
};
const filterDroneDetails = async (req, res, next) => {
    const { models: { drone: Drone } } = COREAPP;
    try {
       

        console.log("@@@@@@@@@@@@@@@@@",req.body)
        
		const droneData = await Drone.findAll({
            //  where: {
            //     service:req.body.service,
            //     brand: req.body.brand,
            //     equipment:req.body.equipment,
            //     status:req.body.status,
            //     price:{
            //         [Op.lt]:req.body.price
            //     },
             
            //  }
		});
        req.model = {};
        req.model.data = droneData;
        console.log("mode;",req.model.data)
        return next();
    }
    catch {
        console.log('error for drones data');
        return next();
    }
};
const BookingDroneDetails = async (req, res, next) => {
    const { models: { booking: Booking } } = COREAPP;
    try {
        console.log("@@@@@@@@@@@@@@@@@",req.body,req.body.user_id)
		// const bookingData = await Booking.findAll({
        //  raw:true
		// });
        const bookingData = await Booking.create({
            user_id:req.body.user_id,
            drone_id:req.body.drone_id,
            land_id:req.body.land_id,
            farm_id:req.body.farm_id,
            pilot_id:req.body.pilot_id,
            start_date:req.body.start_date,
            end_date:req.body.end_dates,
           });
        console.log(bookingData)
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
const FarmUserDroneDetails = async (req, res, next) => {
    const { models: {farm : Farm } } = COREAPP;
    try {
        console.log("@@@@@@@@@@@@@@@@@",req.body)
		// const bookingData = await Booking.findAll({
        //  raw:true
		// });
        const droneFarm = await Farm.findAll({
            raw:true
		});
        console.log("dorne",droneFarm)
        req.model = {};
        req.model.data = {
            sucess: true,
            data: droneFarm
        };
        return next();
    }
    catch(e) {
        console.log('error for drones data',e.message);
        return next();
    }
};

module.exports = {
    getDroneDetails,
    filterDroneDetails,
    BookingDroneDetails,
    FarmUserDroneDetails
};