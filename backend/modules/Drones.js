const sequelize = require('sequelize');
const drone = require('../models/drone');
const Op = sequelize.Op;
const { registerDrone, deleteDrone } = require('./SimulatorInteraction');

const getDrones = async (req, res, next) => {
    const { models: { drone: Drone } } = COREAPP;
    const { query } = req;
    for (let key in query) {
        if (query[key].indexOf(',')) {
            query[key] = {
                [Op.or]: query[key].split(',')
            }
        }
    }
    try {
		const droneData = await Drone.findAll({where:{...query}, raw: true});
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
};

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

module.exports = {
    getDrones,
    registerUAV,
    deregisterUAV,
    filterDroneDetails
};