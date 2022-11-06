import {
   ADD_ADMIN_DRONE_TRACKING,
   LOADING_ADMIN_DRONE_TRACKING,
   CLEAR_ADMIN_DRONE_TRACKING,
   FETCH_ADMIN_DRONE_TRACKING_ERROR,
   ADD_ADMIN_DRONE_ID_TRACKING,
   LOADING_ADMIN_DRONE_ID_TRACKING,
   CLEAR_ADMIN_DRONE_ID_TRACKING,
   FETCH_ADMIN_DRONE_ID_TRACKING_ERROR
} from '../constants/actionTypes';

function fetchAdminDroneTrackingSuccess(data) {
   return {
      type: ADD_ADMIN_DRONE_TRACKING,
      payload: data
   }
}

function fetchAdminDroneTrackingFailure(data) {
   return {
      type: FETCH_ADMIN_DRONE_TRACKING_ERROR,
      payload: data
   }
}

export function adminDroneTrackingLoading() {
   return {
      type: LOADING_ADMIN_DRONE_TRACKING
   }
}

export function handleAdminDroneTrackingResponse(response) {
   const {data} = response;
   if (data.success) {
      return fetchAdminDroneTrackingSuccess(data.data);
   } else {
      return fetchAdminDroneTrackingFailure({
         message: data.message
      });
   }
}

function fetchAdminDroneIDTrackingSuccess(id, data) {
   const {tracking_data} = data;
   return {
      type: ADD_ADMIN_DRONE_ID_TRACKING,
      payload: {
         id,
         data: tracking_data
      }
   }
}

function fetchAdminDroneIDTrackingFailure(id, data) {
   return {
      type: FETCH_ADMIN_DRONE_ID_TRACKING_ERROR,
      payload: {
         id,
         data
      }
   }
}

export function adminDroneIDTrackingLoading() {
   return {
      type: LOADING_ADMIN_DRONE_ID_TRACKING
   }
}

export function handleAdminDroneIDTrackingResponse(id, response) {
   const {data} = response;
   if (data.success) {
      return fetchAdminDroneIDTrackingSuccess(id, data.data);
   } else {
      return fetchAdminDroneIDTrackingFailure(id, {
         message: data.message
      });
   }
}