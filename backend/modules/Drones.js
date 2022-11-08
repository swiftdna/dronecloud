const sequelize = require('sequelize')
const Op = sequelize.Op

const getDrones = async (req, res, next) => {
    const { models: { drone: Drone } } = COREAPP;
    const { query } = req;
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
module.exports = {
    getDrones,
    filterDroneDetails
};