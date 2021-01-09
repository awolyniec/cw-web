import { combineReducers } from 'redux';

import userReducer from './users/reducer';
import chatEventReducer from './chatevents/reducer';
import webSocketReducer from './websockets/reducer';

export default combineReducers({
  users: userReducer,
  chatEvents: chatEventReducer,
  websockets: webSocketReducer
});