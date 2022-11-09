const sequelize = require('sequelize');
const _ = require('underscore');
const drone = require('../models/drone');
const Op = sequelize.Op;
const { registerDrone, deleteDrone } = require('./SimulatorInteraction');

const getDrones = async (req, res, next) => {
    const { models: { drone: Drone } } = COREAPP;
    const { query, internal } = req;
    for (let key in query) {
        if (query[key].indexOf(',')) {
            query[key] = {
                [Op.or]: query[key].split(',')
            }
        }
    }
    try {
		const droneData = await Drone.findAll({where:{...query}, raw: true});
        if (internal) {
            return droneData;
        }
        req.model = {};
        req.model.data = {
            success: true,
            data: droneData
        };
        return next();
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: "Unable to fetch all drones data",
                err: e.message
            }
        };
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

const registerUAV = async (req, res, next) => {
    const { models: { drone: Drone } } = COREAPP;
    const {id} = req.params;
    let registrationParams = {};
    try {
        const dronesData = await Drone.findAll({
            where:{
                id
            }, 
            raw: true
        });
        if (!dronesData || !dronesData.length) {
            res.json({
                success: false,
                data: {
                    message: 'Drone not found in the database!'
                }
            });
            return;
        }
        const [droneData] = dronesData;
        registrationParams = {
            body: {
                "device_id": droneData.id,
                "device_type": "drone",
                "device_model": droneData.model,
                "device_maker": droneData.manufacturer,
                "service_type": droneData.service
            },
            internal: true
        };
        const simulatorResults = await registerDrone(registrationParams);
        if (simulatorResults && simulatorResults.device_id) {
            const updateResults = await Drone.update({
                status: 'available'
            }, {
                where: {
                    id
                }
            });
            req.model.data = {
                success: true,
                data: simulatorResults,
                updateResults
            };
            return next();
        } else {
            res.json({
                success: false,
                data: {
                    message: 'Something went wrong in the registration. Please try again later'
                }
            });
        }
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: e.message
            }
        };
        return next();
    }
}
const deregisterUAV = async (req, res, next) => {
    const { models: { drone: Drone } } = COREAPP;
    const {id} = req.params;
    let registrationParams = {};
    try {
        const dronesData = await Drone.findAll({
            where:{
                id
            }, 
            raw: true
        });
        if (!dronesData || !dronesData.length) {
            res.json({
                success: false,
                data: {
                    message: 'Drone not found in the database!'
                }
            });
            return;
        }
        const [droneData] = dronesData;
        registrationParams = {
            params: {
                id
            },
            internal: true
        };
        const simulatorResults = await deleteDrone(registrationParams);
        if (simulatorResults && simulatorResults.device_id) {
            const updateResults = await Drone.update({
                status: 'deleted'
            }, {
                where: {
                    id
                }
            });
            req.model.data = {
                success: true,
                data: simulatorResults,
                updateResults
            };
            return next();
        } else {
            res.json({
                success: false,
                data: {
                    message: 'Something went wrong in the deregistration. Please try again later'
                }
            });
        }
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: e.message
            }
        };
        return next();
    }
};

const getAvailableDrones = async (req, res, next) => {
    const { from, to, service, price, equipment, brand } = req;
    const droneReq = {
        query: {
            status: 'available,deployed,booked'
        },
        internal: true
    };
    if (service) {
        droneReq.query = {
            ...droneReq.query,
            service
        };
    }
    if (equipment) {
        droneReq.query = {
            ...droneReq.query,
            equipment
        };
    }
    if (price) {
        droneReq.query = {
            ...droneReq.query,
            price: {
                [Op.lte]: price
            }
        };
    }
    if (equipment) {
        droneReq.query = {
            ...droneReq.query,
            equipment
        };
    }
    if (brand) {
        droneReq.query = {
            ...droneReq.query,
            manufacturer: brand
        };
    }
    try {
        const dronesData = await getDrones(droneReq);
        console.log(dronesData);
        const AllDroneIDs = _.pluck(dronesData, 'id');
        req.model.data = {
            success: true,
            data: AllDroneIDs
        };
        return next();
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: e.message
            }
        };
        return next();
    }
};

module.exports = {
    getDrones,
    registerUAV,
    deregisterUAV,
    getAvailableDrones,
    filterDroneDetails,
    BookingDroneDetails,
    FarmUserDroneDetails,
};