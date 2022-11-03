import { combineReducers } from 'redux';

import appReducer from './appReducer';
import profileReducer from './profileReducer';
import adminDroneTrackingReducer from './adminDroneTrackingReducer';

const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
  admindronetracking: adminDroneTrackingReducer,
})

export default rootReducer