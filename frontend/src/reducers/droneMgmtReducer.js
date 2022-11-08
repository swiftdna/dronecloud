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

const initialState = {
  loading: false,
  pendingLoading: false,
  data: [],
  pending: [],
  error: false,
  errorPending: false,
  errorMessage: '',
  errorMessagePending: ''
};

export default function droneMgmtReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DRONE_MGMT:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case LOADING_DRONE_MGMT:
      return {
        ...state,
        loading: true
      }
    case CLEAR_DRONE_MGMT:
      return {
        ...state,
        data: {}
      }
    case FETCH_DRONE_MGMT_ERROR:
      return {
        ...state,
        data: {},
        error: true,
        errorMessage: action.payload
      }
    case ADD_PENDING_DRONES:
      return {
        ...state,
        pendingLoading: false,
        pending: action.payload
      }
    case LOADING_PENDING_DRONES:
      return {
        ...state,
        pendingLoading: true
      }
    case CLEAR_PENDING_DRONES:
      return {
        ...state,
        pending: []
      }
    case FETCH_PENDING_DRONES_ERROR:
      return {
        ...state,
        pending: [],
        error: true,
        errorMessage: action.payload
      }
    default:
      return state
  }
}