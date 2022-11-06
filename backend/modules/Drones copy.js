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
        const fromdate = new Date(req.body.fromdate)
        const date = new Date(req.body.fromdate)

        console.log("@@@@@@@@@@@@@@@@@",fromdate,todate)
        
		const droneData = await Drone.findAll({
             where: {
                service:req.body.service,
                brand: req.body.brand,
                equipment:req.body.equipment,
                status:req.body.status,
                price:{
                    [Op.lt]:req.body.price
                },
                // availablefrom:{
                //     [Op.gte]:req.body.fromdate
                // },
                // availabletill:{
                //     [Op.lte]:req.body.todate
                // },
                
             }
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
    getDroneDetails,
    filterDroneDetails
};