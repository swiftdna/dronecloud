const sequelize = require('sequelize')
const Op = sequelize.Op

const addPilotInfo = async (req, res, next) => {
    const { models: { pilot_info: Pilot } } = COREAPP;
    const { id: user_id } = req.user;
    const { body } = req;
    body.user_id = user_id;
    try {
		const pilotData = await Pilot.create(body);
        req.model = {};
        req.model.data = {
            success: true,
            data: pilotData
        };
        return next();
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: "Unable to add pilot cert data",
                err: e.message
            }
        };
        return next();
    }
}

module.exports = {
    addPilotInfo
};