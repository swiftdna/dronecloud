const sequelize = require('sequelize')
const Op = sequelize.Op;

const getLands = async (req, res, next) => {
    const { models: { land: Land } } = COREAPP;
    const { query } = req;
    try {
		const landData = await Land.findAll({
            where: {
                ...query
            },
            raw: true
        });
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
                message: "Unable to fetch all land data",
                err: e.message
            }
        };
        return next();
    }
};

module.exports = {
    getLands
};