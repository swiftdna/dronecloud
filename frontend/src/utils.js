import { profileLoading, handleProfilesResponse } from './actions/app-profile';
import { handleLoginResponse, setToast, handleCountriesResponse,handleDisplayDroneResponse } from './actions/app-actions';
import { adminDroneTrackingLoading, handleAdminDroneTrackingResponse } from './actions/app-admin-drone-tracking';
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
    axios.get(`/api/ext/drones`)
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

export function capitalizeFirst(str){
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

export function uploadImageToCloud(dispatch, file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('cloud_name', 'dac0hzhv5')
    formData.append('upload_preset', 'j8gp4zov')

    return axios.post(
      'https://api.cloudinary.com/v1_1/dac0hzhv5/image/upload',
      formData
    );
}
