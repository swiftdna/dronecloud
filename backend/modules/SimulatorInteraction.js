const host = 'http://ec2-52-203-10-77.compute-1.amazonaws.com';
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { makeHTTPRequest } = require('./ExtCall');
const _ = require('underscore');
const { getMultiUserMultiBookings } = require('./Booking');
const { getLandCoords } = require('./Lands');

const registerDrone = async (req, res, next) => {
    const { body, internal } = req;
    const path = `/flight_data_collect/register-drone/`;
    const httpParams = {
        host,
        path,
        method: 'POST',
        form: body
    };
    const result = await makeHTTPRequest(httpParams);
    if (internal) {
        return result;
    }
    req.model.data = {success: true, data: result};
    return next();
};
const flysimulatorbooking = async (req, res, next) => {
    const { body, internal } = req;
    console.log(body,internal)
    const path = `/flight_data_collect/fly-simulation/`;
    const httpParams = {
        host,
        path,
        method: 'POST',
        form: body
    };
    const result = await makeHTTPRequest(httpParams);
    if (internal) {
        return result;
    }
    req.model.data = {success: true, data: result};
    return next();
};
const checkTripStatus = async (params) => {
    const { droneID, id } = params;
    const path = `/flight_data_collect/get-service-status-by-service/${droneID}/${id}/`;
    const httpParams = {
        host,
        path,
        method: 'GET',
    };
    const result = await makeHTTPRequest(httpParams);
    return {
        ...result,
        droneID,
        serviceID: id
    };
};


const updateDrone = async (params) => {
    // TODO: Implement
};

const deleteDrone = async (req, res, next) => {
    const {params : { id }, internal} = req;
    const path = `/flight_data_collect/delete-drone/`;
    const httpParams = {
        host,
        path,
        method: 'POST',
        form: {
            device_id: parseInt(id)
        }
    };
    const result = await makeHTTPRequest(httpParams);
    if (internal) {
        return result;
    }
    req.model.data = {success: true, data: result};
    return next();
};

const getDronePaths = async (req, res, next) => {
    const {params : { id }, query: { clean } } = req;
    const path = `/flight_data_collect/get-tracking/${id}`;
    const params = {
        host,
        path,
        method: 'GET'
    };
    const result = await makeHTTPRequest(params);
    if (clean) {
        const trips = [];
        const coords = {};
        const tripExpectedCoords = {};
        const bookingsMap = {};
        const {tracking_data} = result;
        for (let i = 0; i < tracking_data.length; i++) {
            if (trips.indexOf(tracking_data[i].service_id) === -1) {
                trips.push(tracking_data[i].service_id);
            }
            // coords[tracking_data[i].service_id] = tracking_data[i];
            if (coords[tracking_data[i].service_id]) {
                coords[tracking_data[i].service_id].push(tracking_data[i]);
            } else {
                coords[tracking_data[i].service_id] = [tracking_data[i]];
            }
        }
        // Get land coords for expected path
        const bookingParams = {
            query: {
                id: {
                    [Op.in]: trips
                }
            },
            internal: true
        };
        const bookings = await getMultiUserMultiBookings(bookingParams);
        let landIDs = _.pluck(bookings, 'land_id');
        landIDs = _.uniq(landIDs, false)
        const landParams = {
            query: {
                land_id: {
                    [Op.in]: landIDs
                }
            },
            internal: true
        };
        const landCoords = await getLandCoords(landParams);
        for (let i = 0; i< landCoords.length; i++) {
            if (tripExpectedCoords[landCoords[i].land_id]) {
                tripExpectedCoords[landCoords[i].land_id].push(landCoords[i])
            } else {
                tripExpectedCoords[landCoords[i].land_id] = [landCoords[i]];
            }
        }
        bookings.map(bk => {
            if (bk.land_id && tripExpectedCoords[bk.land_id]) {
                bk.expectedCoords = [...tripExpectedCoords[bk.land_id]];
            }
            return bk;
        });
        for (let i = 0; i < bookings.length; i++) {
            if (bookings[i].land_id && tripExpectedCoords[bookings[i].land_id]) {
                bookings[i].expectedCoords = [...tripExpectedCoords[bookings[i].land_id]];
            }
            bookingsMap[bookings[i].id] = bookings[i];
        }
        req.model.data = {success: true, data: {tracking_data: coords, trips, bookingsMap}};
        return next();
    }
    req.model.data = {success: true, data: result};
    return next();
};

const getAllDrones = async (req, res, next) => {
    const path = `/flight_data_collect/get-drones/`;
    const params = {
        host,
        path,
        method: 'GET'
    };
    const result = await makeHTTPRequest(params);
    req.model.data = {success: true, data: result};
    return next();
};

const getDroneLastSeenLocationsOld = async (req, res, next) => {
    const {data} = req.model.data;
    const dataCleansed = data && typeof data === 'string' ? JSON.parse(data) : data;
    const ids = _.pluck(dataCleansed, 'drone_id');
    const path = `/flight_data_collect/get-recent-tracking/${ids.join(',')}`;
    const params = {
        host,
        path,
        method: 'GET'
    };
    try {
        const result = await makeHTTPRequest(params);
        const formattedData = result && typeof result === 'string' ? JSON.parse(result) : {};
        const lastSeenLocationData = formattedData && formattedData.tracking_data ? formattedData.tracking_data : [];
        const lastSeenLocationDataMap = {};
        for (let i = 0; i < lastSeenLocationData.length; i++) {
            lastSeenLocationDataMap[lastSeenLocationData[i].drone_id] = lastSeenLocationData[i];
        }
        for (let i = 0; i < dataCleansed.length; i++) {
            if (dataCleansed[i].drone_id && lastSeenLocationDataMap[dataCleansed[i].drone_id]) {
                dataCleansed[i].last_seen = {
                    lat: lastSeenLocationDataMap[dataCleansed[i].drone_id].latitude,
                    lng: lastSeenLocationDataMap[dataCleansed[i].drone_id].longitude,
                    alt: lastSeenLocationDataMap[dataCleansed[i].drone_id].altitude,
                }
            }
        }
        req.model.data = {
            ...req.model.data,
            data: dataCleansed
        };
        // req.model.data = {success: true, data: result};
        return next();
    } catch (e) {
        req.error = true;
        req.model.data = {
            ...req.model.data,
            error: true,
            message: e.message
        };
        return next();
    }
};

const getDroneLastSeenLocations = async (req, res, next) => {
    const {data} = req.model.data;
    const dataCleansed = data && typeof data === 'string' ? JSON.parse(data) : data;
    const ids = _.pluck(dataCleansed, 'id');
    if (!ids || !ids.length) {
        req.model.data = {
            ...req.model.data,
            data: []
        };
        return next();
    }
    const path = `/flight_data_collect/get-recent-tracking/${ids.join(',')}`;
    const params = {
        host,
        path,
        method: 'GET'
    };
    const result = await makeHTTPRequest(params);
    const formattedData = result && typeof result === 'string' ? JSON.parse(result) : result;
    const lastSeenLocationData = formattedData && formattedData.tracking_data ? formattedData.tracking_data : [];
    const lastSeenLocationDataMap = {};
    for (let i = 0; i < lastSeenLocationData.length; i++) {
        lastSeenLocationDataMap[lastSeenLocationData[i].drone_id] = lastSeenLocationData[i];
    }
    for (let i = 0; i < dataCleansed.length; i++) {
        if (dataCleansed[i].id && lastSeenLocationDataMap[dataCleansed[i].id]) {
            dataCleansed[i].last_seen = {
                lat: lastSeenLocationDataMap[dataCleansed[i].id].latitude,
                lng: lastSeenLocationDataMap[dataCleansed[i].id].longitude,
                alt: lastSeenLocationDataMap[dataCleansed[i].id].altitude,
            }
        } else {
            dataCleansed[i].last_seen = {};
        }
    }
    req.model.data = {
        ...req.model.data,
        data: dataCleansed
    };
    // req.model.data = {success: true, data: result};
    return next();
};

module.exports = {
	registerDrone,
    updateDrone,
    deleteDrone,
    getDronePaths,
    getAllDrones,
    getDroneLastSeenLocations,
    getDroneLastSeenLocationsOld,
    flysimulatorbooking,
    checkTripStatus
};