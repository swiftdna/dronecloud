const sequelize = require('sequelize')
const Op = sequelize.Op

const addPlot = async (req, res, next) => {
    const { models: { land: Land, land_coord: LandCoords } } = COREAPP;
    console.log(req.farm);
    // const { id: farm_id } = req.farm;
    const { id: user_id } = req.user;
    const { body } = req;
    body.user_id = user_id;
    const coordinates = [...body.coordinates];
    delete body.coordinates;
    try {
		const landData = await Land.create(body);
        const {id: land_id} = landData;
        for (let i = 0; i < coordinates.length; i++) {
            coordinates[i].land_id = land_id;
        }
        const landCoordsData = LandCoords.bulkCreate(coordinates);
        req.model = {};
        req.model.data = {
            success: true,
            data: landData,
            inserts: landCoordsData
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