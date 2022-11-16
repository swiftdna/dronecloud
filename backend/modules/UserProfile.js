const getUserDetails = async (req, res, next) => {
	const { user_id } = req.params;
	const { models: {user: User} } = COREAPP;
	try {
		const user = await User.findOne({
	        where: {
	            id: user_id
	        }
	    });
    	if (user) {
    		res.json({
    			success: true,
    			data: user
    		});
    	} else {
    		res.json({
    			success: true,
    			data: {},
    			message: 'User not found!'
    		});
    	}
    	return next();
    } catch (err) {
    	res.json({
	    	success: false,
	    	message: err.message
	    });
		return next();
	}
};

const updateUserDetails = async (req, res, next) => {
	// const { user_id } = req.params;
	const { id: user_id } = req.user;
	const { body } = req;
	const { models: { user: User } } = COREAPP;
	try {
		const userData = await User.findOne({
			where: {
				id: user_id
			}
		});
		if (userData && userData.id) {
			const userProfileData = await User.findOne({
		        where: {
		            id: user_id
		        }
		    });
		    if (userProfileData) {
	    		userProfileData.update(body);
	    		res.json({
                	success: true,
                	message: 'Update successful!'
                });
	    		return next();
	    	} else {
	    		throw new Error('User not found in the database');
	    	}
		} else {
			throw new Error('User not found in the database');
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
	getUserDetails,
	updateUserDetails
};

