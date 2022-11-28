const sequelize = require('sequelize')
const Op = sequelize.Op

const addPayment = async (req, res, next) => {
    const { models: { card_detail: Card_detail } } = COREAPP;
    const { id: user_id } = req.user;
    const { body } = req;
    body.user_id = user_id;
    try {
		const paymentData = await Card_detail.create(body);
        req.model = {};
        req.model.data = {
            success: true,
            data: paymentData
        };
        return next();
    } catch(e) {
        req.model.data = {
            success: false,
            data: {
                message: "Unable to add payment info",
                err: e.message
            }
        };
        return next();
    }
}

module.exports = {
    addPayment
};