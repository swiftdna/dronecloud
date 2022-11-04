import { combineReducers } from 'redux';

import appReducer from './appReducer';
import bookingReducer from './bookSlice';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
  bookdrone:bookingReducer,
})

export default rootReducer