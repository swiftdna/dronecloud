const sequelize = require('sequelize')
const Op = sequelize.Op

const addFarm = async (req, res, next) => {
    const { models: { farm: Farm } } = COREAPP;
    const { id: user_id } = req.user;
    const { body } = req;
    body.user_id = user_id;
    try {
		const farmData = await Farm.create(body);
        req.model = {};
        req.model.data = {
            success: true,
            data: farmData
        };
        return next();
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: "Unable to add farm data",
                err: e.message
            }
        };
        return next();
    }
}

const addOwner = async (req, res, next) => {
    const { models: { farm: Farm } } = COREAPP;
    const { id: user_id } = req.user;
    const { body } = req;
    body.user_id = user_id;
    try {
		const ownerData = await Farm.create(body);
        req.model = {};
        req.model.data = {
            success: true,
            data: ownerData
        };
        return next();
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: "Unable to add farm owner data",
                err: e.message
            }
        };
        return next();
    }
}

const getFarms = async (req, res, next) => {
    const { models: { farm: Farm } } = COREAPP;
    try {
		const farmData = await Farm.findAll({raw: true});
        req.model = {};
        req.model.data = {
            success: true,
            data: farmData
        };
        return next();
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: "Unable to fetch all farms data",
                err: e.message
            }
        };
        return next();
    }
};

const getFarmDetails = async (req, res, next) => {
	const { userID } = req.params;
	const { models: {farm: Farm} } = COREAPP;
	console.log('getUserDetails -> user_id - ', userID);
	try {
		const farm = await Farm.findOne({
	        where: {
	            user_id: userID
	        }
	    });
    	// console.log('user -> ', user);
    	if (farm) {
    		res.json({
    			success: true,
    			data: farm
    		});
    	} else {
    		res.json({
    			success: true,
    			data: {},
    			message: 'Farm not found!'
    		});
    	}
    	return next();
    } catch (err) {
    	console.log('getFarmDetails ERR!! -> ', err);
    	res.json({
	    	success: false,
	    	message: err.message
	    });
		return next();
	}
};

const updateFarmDetails = async (req, res, next) => {
	// const { user_id } = req.params;
	const { id: farm_id } = req.farm;
	const { body } = req;
	const { models: { farm: Farm } } = COREAPP;
	// Image upload to be handled
	// console.log('updateUserDetails -> user_id - ', user_id);
	try {
		const farmData = await Farm.findOne({
			where: {
				id: farm_id
			}
		});
		if (farmData && farmData.id) {
			const farmProfileData = await Farm.findOne({
		        where: {
		            id: farm_id
		        }
		    });
		    if (farmProfileData) {
	    		farmProfileData.update(body);
	    		res.json({
                	success: true,
                	message: 'Update successful!'
                });
	    		return next();
	    	} else {
	    		throw new Error('Farm not found in the database');
	    	}
		} else {
			throw new Error('Farm not found in the database');
		}
	} catch(err) {
    	res.json({
	    	success: false,
	    	message: err.message
	    });
		return next();
    }
};

module.exports = {
    addFarm,
    getFarms,
    addOwner,
	getFarmDetails,
	updateFarmDetails
};