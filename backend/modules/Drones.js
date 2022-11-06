const getDroneDetails = async (req, res, next) => {
    const { models: { drone: Drone } } = COREAPP;
    try {
		const droneData = await Drone.findAll({
		});
        req.model = {};
        req.model.data = droneData;
        console.log(req.model.data)
        return next();
    }
    catch {
        console.log('error for drones data');
        return next();
    }
};
module.exports = {
    getDroneDetails
};