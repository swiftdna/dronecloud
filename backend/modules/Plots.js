const sequelize = require('sequelize')
const Op = sequelize.Op

const addPlot = async (req, res, next) => {
    const { models: { land: Land } } = COREAPP;
    console.log(req.farm);
    // const { id: farm_id } = req.farm;
    const { id: user_id } = req.user;
    const { body } = req;
    body.user_id = user_id;
    try {
		const landData = await Land.create(body);
        req.model = {};
        req.model.data = {
            success: true,
            data: landData
        };
        return next();
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: "Unable to add Plot data",
                err: e.message
            }
        };
        return next();
    }
}

module.exports = {
    addPlot
};