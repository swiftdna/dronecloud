const sequelize = require('sequelize');
const _ = require('underscore');
const moment = require('moment');
const drone = require('../models/drone');
const Op = sequelize.Op;
const { registerDrone, deleteDrone } = require('./SimulatorInteraction');
const { getBookings } = require('./Booking');

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

const FarmUserDroneDetails = async (req, res, next) => {
    const { models: {farm : Farm } } = COREAPP;
    try {
        console.log("@@@@@@@@@@@@@@@@@",req.body.userid)
		// const bookingData = await Booking.findAll({
        //  raw:true
		// });
        const droneFarm = await Farm.findAll({
            where:{
                user_id:req.body.userid
            }, 
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

    
    const { from, to, service, price, equipment, brand } = req.query;
    console.log("9999",from, to, service, price, equipment, brand)
    console.log(service)
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
        const allDroneIDs = _.pluck(dronesData, 'id');
        let bookingParams = {
            query: {
                drone_id: {
                    [Op.in]: allDroneIDs
                }
            },
            internal: true
        };
        if (from && to) {
            bookingParams.query = {
                ...bookingParams.query,
                [Op.or]: [
                    {
                        start_date: {
                            [Op.between]: [moment.unix(from).format('YYYY-MM-DD HH:mm:ss'), moment.unix(to).format('YYYY-MM-DD HH:mm:ss')]
                        }
                    },
                    {
                        end_date: {
                            [Op.between]: [moment.unix(from).format('YYYY-MM-DD HH:mm:ss'), moment.unix(to).format('YYYY-MM-DD HH:mm:ss')]
                        }
                    }
                ]
            }
        }
        const bookingsData = await getBookings(bookingParams);
        const bookedDroneIDs = _.pluck(bookingsData, 'drone_id');
        const availableDroneIDs = allDroneIDs.filter(droneID => bookedDroneIDs.indexOf(droneID) === -1);
        const availableDrones = dronesData.filter(drone => availableDroneIDs.indexOf(drone.id) !== -1);
        req.model.data = {
            success: true,
            data: availableDrones
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
const PilotAvailability = async (req, res, next) => {
    const { models: { pilot_info: PilotInfo,booking:Booking, user: User } } = COREAPP;
    try {
		const pilotinfo = await PilotInfo.findAll({
		});
        req.model = {};
        req.model.data = pilotinfo;
        console.log("",req.model.data)
        const AllpilotIDs = _.pluck(req.model.data , 'id');

        const bookingData = await Booking.findAll({
            raw: true,
            group: ["pilot_id"]
        });
        req.model = {};
        req.model.data = bookingData;
        console.log("&&&",req.model.data )

        const bookedPilotIDs = _.pluck(req.model.data , 'pilot_id');
       // const availableDroneIDs = .filter(droneID => bookedDroneIDs.indexOf(droneID) === -1);
        console.log("&&&333",bookedPilotIDs ,AllpilotIDs)
        const availableDroneIDs = AllpilotIDs.filter(droneID => bookedPilotIDs.indexOf(droneID) === -1);
        console.log(availableDroneIDs)
        const availablepilotinfo = await PilotInfo.findAll({
            where:{
                id: {
                    [Op.in]: availableDroneIDs
                  }
            }, 
            raw: true
		});
        req.model = {};
        req.model.data = availablepilotinfo;
        if(req.model.data){
        user_id=req.model.data[0].user_id
        console.log(typeof user_id)
        const userData = await User.findOne({
            where:{
                id: user_id
            }, 
            raw: true
		});
        req.model = {};
        req.model.data = userData;
        console.log(req.model.data)

        }

        return next();
    }
    catch {
        console.log('error for drones data');
        return next();
    }
};
const getFarmLands = async (req, res, next) => {
    const { models: { land: Land,farm:Farm } } = COREAPP;
    
    console.log("@@@@@@@@@@@@@@@@@",req.body.userid)

    try {
        const landbyuser = await Land.findAll({
            where:{
               user_id: req.body.userid
            }, 
            raw: true
		});
		// const farmland = await Land.findAll({
        //     where:{
                
        //     }, 
        //     raw: true
		// });
        req.model = {};
        req.model.data = landbyuser;
        console.log("mode;",req.model.data)
        const AllfarmIDbyuser = _.pluck(req.model.data , 'id');
        console.log("mode;",AllfarmIDbyuser)
        const landidbyfarm = await Land.findAll({
            where:{
                farm_id: {
                    [Op.in]: AllfarmIDbyuser
                  }
            }, 
            raw: true
		});
        console.log("mode;",landidbyfarm)

        return next();
    }
    catch {
        console.log('error for drones data');
        return next();
    }
};

module.exports = {
    getDrones,
    registerUAV,
    deregisterUAV,
    getAvailableDrones,
    filterDroneDetails,
    FarmUserDroneDetails,
    PilotAvailability,
    getFarmLands
};