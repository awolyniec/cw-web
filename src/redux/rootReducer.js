import { combineReducers } from 'redux';

import userReducer from './users/reducer';
import eventReducer from './events/reducer';

export default combineReducers({
  users: userReducer,
  events: eventReducer
});