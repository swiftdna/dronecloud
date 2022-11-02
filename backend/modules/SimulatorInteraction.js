const host = 'http://ec2-52-203-10-77.compute-1.amazonaws.com';
const { makeHTTPRequest } = require('./ExtCall');

const registerDrone = async (req, res, next) => {
    const { body } = req;
    const path = `/flight_data_collect/register-drone/`;
    const httpParams = {
        host,
        path,
        method: 'POST',
        form: body
    };
    const result = await makeHTTPRequest(httpParams);
    req.model.data = {success: true, data: result};
    return next();
};

const updateDrone = async (params) => {
    // TODO: Implement
};

const deleteDrone = async (req, res, next) => {
    const {params : { id }} = req;
    const path = `/flight_data_collect/delete-drone/`;
    const httpParams = {
        host,
        path,
        method: 'POST',
        form: {
            device_id: id
        }
    };
    const result = await makeHTTPRequest(httpParams);
    req.model.data = {success: true, data: result};
    return next();
};

const getDronePaths = async (req, res, next) => {
    const {params : { id }} = req;
    const path = `/flight_data_collect/get-tracking/${id}`;
    const params = {
        host,
        path,
        method: 'GET'
    };
    const result = await makeHTTPRequest(params);
    req.model.data = {success: true, data: result};
    return next();
};

module.exports = {
	registerDrone,
    updateDrone,
    deleteDrone,
    getDronePaths
};