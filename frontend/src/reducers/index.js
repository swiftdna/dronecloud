import { combineReducers } from 'redux';

import appReducer from './appReducer';
import bookingReducer from './bookSlice';
import profileReducer from './profileReducer';
import adminDroneTrackingReducer from './adminDroneTrackingReducer';
import droneMgmtReducer from './droneMgmtReducer';

const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
  bookdrone:bookingReducer,
  admindronetracking: adminDroneTrackingReducer,
  dronemgmt: droneMgmtReducer
})

export default rootReducer