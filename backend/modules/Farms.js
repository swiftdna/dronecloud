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

// const getFarmDetails = async (req, res, next) => {
// 	const { user_id } = req.params;
// 	const { models: {user: User} } = COREAPP;
// 	console.log('getUserDetails -> user_id - ', user_id);
// 	try {
// 		const user = await User.findOne({
// 	        where: {
// 	            id: user_id
// 	        }
// 	    });
//     	// console.log('user -> ', user);
//     	if (user) {
//     		res.json({
//     			success: true,
//     			data: user
//     		});
//     	} else {
//     		res.json({
//     			success: true,
//     			data: {},
//     			message: 'User not found!'
//     		});
//     	}
//     	return next();
//     } catch (err) {
//     	console.log('getUserDetails ERR!! -> ', err);
//     	res.json({
// 	    	success: false,
// 	    	message: err.message
// 	    });
// 		return next();
// 	}
// };

// const updateFarmDetails = async (req, res, next) => {
// 	// const { user_id } = req.params;
// 	const { id: user_id } = req.user;
// 	const { body } = req;
// 	const { models: { user: User } } = COREAPP;
// 	// Image upload to be handled
// 	// console.log('updateUserDetails -> user_id - ', user_id);
// 	try {
// 		const userData = await User.findOne({
// 			where: {
// 				id: user_id
// 			}
// 		});
// 		if (userData && userData.id) {
// 			const userProfileData = await User.findOne({
// 		        where: {
// 		            id: user_id
// 		        }
// 		    });
// 		    if (userProfileData) {
// 	    		userProfileData.update(body);
// 	    		res.json({
//                 	success: true,
//                 	message: 'Update successful!'
//                 });
// 	    		return next();
// 	    	} else {
// 	    		throw new Error('User not found in the database');
// 	    	}
// 		} else {
// 			throw new Error('User not found in the database');
// 		}
// 	} catch(err) {
//     	res.json({
// 	    	success: false,
// 	    	message: err.message
// 	    });
// 		return next();
//     }
// };

module.exports = {
    addFarm,
    getFarms
	// getFarmDetails,
	// updateFarmDetails
};