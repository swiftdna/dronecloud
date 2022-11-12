import { profileLoading, handleProfilesResponse } from './actions/app-profile';
import { handleLoginResponse, setToast, handleCountriesResponse } from './actions/app-actions';
import { droneMgmtLoading, handleDroneMgmtResponse, pendingDronesLoading, handlePendingDronesResponse } from './actions/app-drones-mgmt';
import { adminDroneTrackingLoading, handleAdminDroneTrackingResponse, adminDroneIDTrackingLoading, handleAdminDroneIDTrackingResponse } from './actions/app-admin-drone-tracking';
// import { useNavigate } from 'react-router-dom';

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
            }
        });
}

export function fetchProfile(dispatch, userObj) {
    const {id: userID} = userObj;
    dispatch(profileLoading());
    axios.get(`/api/users/${userID}`)
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
                return callback(true);
                console.log('Registration failure');
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