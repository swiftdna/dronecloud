import {
  ADD_ADMIN_DRONE_TRACKING,
  LOADING_ADMIN_DRONE_TRACKING,
  CLEAR_ADMIN_DRONE_TRACKING,
  FETCH_ADMIN_DRONE_TRACKING_ERROR,
  ADD_ADMIN_DRONE_ID_TRACKING,
  ADD_ADMIN_DRONE_ID_CLEAN_TRACKING,
  LOADING_ADMIN_DRONE_ID_TRACKING,
  CLEAR_ADMIN_DRONE_ID_TRACKING,
  FETCH_ADMIN_DRONE_ID_TRACKING_ERROR
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: [],
  tracking: [],
  trackingSeveral: [],
  trips: [],
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
        }
      }
    }
    case ADD_ADMIN_DRONE_ID_CLEAN_TRACKING: {
      return {
        ...state,
        trackingLoading: false,
        trackingSeveral: {
          ...state.trackingSeveral,
          [action.payload.id]: action.payload.data
        },
        trips: {
          ...state.trips,
          [action.payload.id]: action.payload.trips
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
        }
      }
    default:
      return state
  }
}