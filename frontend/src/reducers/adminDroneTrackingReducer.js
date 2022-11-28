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

const initialState = {
  loading: false,
  data: [],
  tracking: {},
  routepath: {},
  trackingLoading: false,
  trackingError: false,
  trackingErrorMessage: '',
  error: false,
  errorMessage: ''
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ADMIN_DRONE_TRACKING: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }
    case LOADING_ADMIN_DRONE_TRACKING: {
      return {
        ...state,
        loading: true
      }
    }
    case CLEAR_ADMIN_DRONE_TRACKING:
      return {
        ...state,
        data: {}
      }
    case ADD_ADMIN_DRONE_ID_TRACKING: {
      return {
        ...state,
        trackingLoading: false,
        tracking: {
          ...state.tracking,
          [action.payload.id]: action.payload.data
        },
        routepath: {
          ...state.tracking,
          [action.payload.id]: action.payload.route_data
        }
      }
    }
    case LOADING_ADMIN_DRONE_ID_TRACKING: {
      return {
        ...state,
        trackingLoading: true
      }
    }
    case CLEAR_ADMIN_DRONE_ID_TRACKING:
      return {
        ...state,
        tracking: {
          ...state.tracking,
          [action.payload.id]: []
        },
        routepath: {
          ...state.tracking,
          [action.payload.id]: []
        }
      }
    default:
      return state
  }
}