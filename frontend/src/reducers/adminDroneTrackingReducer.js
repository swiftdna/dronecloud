import {
  ADD_ADMIN_DRONE_TRACKING,
  LOADING_ADMIN_DRONE_TRACKING,
  CLEAR_ADMIN_DRONE_TRACKING,
  FETCH_ADMIN_DRONE_TRACKING_ERROR
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: {},
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
    default:
      return state
  }
}