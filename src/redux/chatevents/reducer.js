import types from './types';

const INITIAL_STATE = {
  allEvents: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_CHAT_EVENTS:
      return {
        ...state,
        allEvents: action.payload
      }
    case types.ADD_CHAT_EVENT:
      return {
        ...state,
        allEvents: state.allEvents.concat([action.payload])
      }
    default:
      return state;
  }
};

export default reducer;
