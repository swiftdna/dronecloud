import { profileLoading, handleProfilesResponse } from './actions/app-profile';
import { handleLoginResponse, setToast, handleCountriesResponse } from './actions/app-actions';
import { droneMgmtLoading, handleDroneMgmtResponse, pendingDronesLoading, handlePendingDronesResponse } from './actions/app-drones-mgmt';
import { adminDroneTrackingLoading, handleAdminDroneTrackingResponse, adminDroneIDTrackingLoading, handleAdminDroneIDTrackingResponse, handleAdminDroneIDCleanTrackingResponse } from './actions/app-admin-drone-tracking';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


export function login(dispatch, data) {
    axios.post(`/signin`, data)
        .then(response => {
            const {data} = response;
            if (data.success) {
                // console.log('Login success');
                dispatch(handleLoginResponse(response));
                // navigate('login');
            } else {
                console.log('Login failure');
                dispatch(setToast({
                    type: 'failure',
                    message: 'Invalid Credentials!'
                }));
            }
        });
}

export function incompleteFields(dispatch) {
    // console.log('entered app-actions');
    dispatch(setToast({
        type: 'incomplete',
        message: 'Please fill out all fields'
    }));
}
export function emailValidation(dispatch) {
    dispatch(setToast({
        type: 'failure',
        message: 'Invalid email format'
    }));
}

export function fetchProfile(dispatch, userObj) {
    const {id: userID} = userObj;
    dispatch(profileLoading());
    axios.get(`/api/users/${userID}`)
        .then(response => {
            dispatch(handleProfilesResponse(response));
        });
}

export function fetchFarm(dispatch, farmObj) {
    const {id: userID} = farmObj;
    dispatch(profileLoading());
    axios.get(`/api/farms/profile/${userID}`)
        .then(response => {
            dispatch(handleProfilesResponse(response));
        });
}

export function getAdminDroneList(dispatch) {
    dispatch(adminDroneTrackingLoading());
    axios.get(`/api/tracking/drones?status=available,booked,deployed`)
        .then(response => {
            dispatch(handleAdminDroneTrackingResponse(response));
        });
}

export function getAdminDroneDetails(dispatch, drone_id) {
    dispatch(adminDroneIDTrackingLoading());
    axios.get(`/api/tracking/drones/${drone_id}`)
        .then(response => {
            dispatch(handleAdminDroneIDTrackingResponse(drone_id, response));
        });
}

export function getAdminDroneCleanDetails(dispatch, drone_id) {
    dispatch(adminDroneIDTrackingLoading());
    axios.get(`/api/tracking/drones/${drone_id}?clean=true`)
        .then(response => {
            dispatch(handleAdminDroneIDCleanTrackingResponse(drone_id, response));
        });
}

export function getManagementDrones(dispatch, params) {
    dispatch(droneMgmtLoading());
    axios.get(`/api/drones`, { params })
        .then(response => {
            dispatch(handleDroneMgmtResponse(response));
        });
}

export function getPendingMgmtDrones(dispatch, params) {
    dispatch(pendingDronesLoading());
    axios.get(`/api/drones`, { params })
        .then(response => {
            dispatch(handlePendingDronesResponse(response));
        });
}

export function bookTheDrone(dispatch, params) {
    axios.post(`/api/drone/booking`, params)
        .then(response => {
            const {data} = response;
            console.log('booking -> ', data);
            // if (data.success) {
            //     return callback(null, true);
            // } else {
            //     return callback(true);
            // }
        });
}

export function registerDrone(dispatch, id, callback) {
    axios.post(`/api/drones/${id}/register`)
        .then(response => {
            const {data} = response;
            if (data.success) {
                dispatch(setToast({
                    type: 'success',
                    message: 'Drone registered successfully!'
                }));
                return callback(true);
            } else {
                dispatch(setToast({
                    type: 'failure',
                    message: 'Unable to register drone. Try again later'
                }));
                return callback(false);
            }
        });
}

export function deregisterDrone(dispatch, id, callback) {
    axios.post(`/api/drones/${id}/deregister`)
        .then(response => {
            const {data} = response;
            if (data.success) {
                dispatch(setToast({
                    type: 'success',
                    message: 'Drone deregistered successfully!'
                }));
                return callback(true);
            } else {
                dispatch(setToast({
                    type: 'failure',
                    message: 'Unable to deregister drone. Try again later'
                }));
                return callback(false);
            }
        });
}

export function capitalizeFirst(str){
    if (!str) {
        return;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function updateProfile(dispatch, params, callback) {
    if (params.id)
        delete params.id;
    axios.put(`/api/users/profile`, params)
        .then(response => {
            const {data} = response;
            if (data.success) {
                dispatch(setToast({
                    type: 'success',
                    message: 'User profile updated successfully!'
                }));
                return callback(null, true);
            } else {
                return callback(true);
            }
        });
}

export function addFarm(dispatch, params, callback) {
    if (params.id)
        delete params.id;
    axios.post(`/api/farms`, params)
        .then(response => {
            const {data: parent_data} = response;
            const {data} = parent_data;
            if (parent_data.success) {
                return callback(null, data.id);
            } else {
                return callback(true);
            }
        });
}

export function addPlot(dispatch, params, callback) {
    if (params.id)
        delete params.id;
    axios.post(`/api/plot`, params)
        .then(response => {
            const {data} = response;
            if (data.success) {
                return callback(null, true);
            } else {
                return callback(true);
            }
        });
}

export function addPilotInfo(dispatch, params, callback) {
    if (params.id)
        delete params.id;
    axios.post(`/api/pilot`, params)
        .then(response => {
            const {data} = response;
            if (data.success) {
                return callback(null, true);
            } else {
                return callback(true);
            }
        });
}

export function addPayment(dispatch, params, callback) {
    if (params.id)
        delete params.id;
    axios.post(`/api/payment`, params)
        .then(response => {
            const {data} = response;
            if (data.success) {
                return callback(null, true);
            } else {
                return callback(true);
            }
        });
}


export function farmOwnerInfo(dispatch, params, callback) {
    if (params.id)
        delete params.id;
    axios.post(`/api/farms/owner`, params)
        .then(response => {
            const {data} = response;
            if (data.success) {
                return callback(null, true);
            } else {
                return callback(true);
            }
        });
}

export function register(dispatch, data, callback) {
    // const navigate = useNavigate();
    // dispatch(profileLoading());
    axios.post(`/signup`, data)
        .then(response => {
            const {data} = response;
            if (data.success) {
                console.log('Registration success');
                return callback(null, true);
                // navigate('login');
            } else {
                const msg = data.message.message; 
                // console.log(data.message.message);
                if (msg == "That username is already taken") {
                    dispatch(setToast({
                        type: 'failure',
                        message: 'That username is already taken'
                    }));
                }
                return callback(true);
            }
        });
}

export function checkSession(dispatch) {
    axios.get('/api/session')
        .then(response => {
            dispatch(handleLoginResponse(response));
        })
        .catch(err => {
            // console.log(err.message);
        });
}

export function fetchSession(dispatch, callback) {
    axios.get('/api/session')
        .then(response => {
            dispatch(handleLoginResponse(response));
            return callback(null, true);
        })
        .catch(err => {
            // console.log(err.message);
            return callback(true);
        });
}


export function uploadImageToCloud(file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('cloud_name', 'dylqg3itm')
    formData.append('upload_preset', 'ld9mmcgj')

    return axios.post(
      'https://api.cloudinary.com/v1_1/dylqg3itm/image/upload',
      formData
    );
}
export function addDrone(dispatch,formData){
    axios.post("/api/droneCatalog/add", formData).then((res)=>{
        if(res.data.success){
            dispatch(setToast({
                type: 'success',
                message: 'Drone details added successfully!'
            }));
        }
         }).catch((err)=>{
             console.log(err);
         })
    

}
export function updateDrone(formData,id){
    axios.post(`/api/droneCatalog/updateDrone/${id}`, formData).then((res)=>{
        if(res.data.success){
             console.log("success");
             return (true);
        }
         }).catch((err)=>{
             console.log(err);
         })
    

}