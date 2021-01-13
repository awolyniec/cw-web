import { combineReducers } from 'redux';

import userReducer from './users/reducer';
import chatEventReducer from './chatevents/reducer';
import webSocketReducer from './websockets/reducer';
import signInReducer from './signin/reducer';

export default combineReducers({
  users: userReducer,
  chatevents: chatEventReducer,
  websockets: webSocketReducer,
  signin: signInReducer
});