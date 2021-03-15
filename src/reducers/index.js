import { combineReducers } from 'redux';
import userReducer from './userReducer';
import illnessReducer from './illnessReducer';
import trackingReducer from './trackingReducer';

export default combineReducers({
  user: userReducer,
  illness: illnessReducer,
  tracking: trackingReducer,
});
