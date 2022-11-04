import {
   ADD_ADMIN_DRONE_TRACKING,
   LOADING_ADMIN_DRONE_TRACKING,
   CLEAR_ADMIN_DRONE_TRACKING,
   FETCH_ADMIN_DRONE_TRACKING_ERROR
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