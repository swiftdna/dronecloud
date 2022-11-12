import {
   ADD_DRONE_MGMT,
   LOADING_DRONE_MGMT,
   CLEAR_DRONE_MGMT,
   FETCH_DRONE_MGMT_ERROR,
   ADD_PENDING_DRONES,
   LOADING_PENDING_DRONES,
   CLEAR_PENDING_DRONES,
   FETCH_PENDING_DRONES_ERROR,
} from '../constants/actionTypes';

function fetchDroneMgmtSuccess(data) {
   return {
      type: ADD_DRONE_MGMT,
      payload: data
   }
}

function fetchDroneMgmtFailure(data) {
   return {
      type: FETCH_DRONE_MGMT_ERROR,
      payload: data
   }
}

export function droneMgmtLoading() {
   return {
      type: LOADING_DRONE_MGMT
   }
}

export function handleDroneMgmtResponse(response) {
   const {data} = response;
   if (data.success) {
      return fetchDroneMgmtSuccess(data.data);
   } else {
      return fetchDroneMgmtFailure({
         message: data.message
      });
   }
}

function fetchPendingDronesSuccess(data) {
   return {
      type: ADD_PENDING_DRONES,
      payload: data
   }
}

function fetchPendingDronesFailure(data) {
   return {
      type: FETCH_PENDING_DRONES_ERROR,
      payload: data
   }
}

export function pendingDronesLoading() {
   return {
      type: LOADING_PENDING_DRONES
   }
}

export function handlePendingDronesResponse(response) {
   const {data} = response;
   if (data.success) {
      return fetchPendingDronesSuccess(data.data);
   } else {
      return fetchPendingDronesFailure({
         message: data.message
      });
   }
}