import types from './types';

const INITIAL_STATE = {
  self: null,
  requestedSelf: null,
  others: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_SELF_USER:
      return {
        ...state,
        self: action.payload
      };
    case types.SET_OTHER_USERS:
      return {
        ...state,
        others: action.payload
      }
    case types.ADD_OTHER_USER:
      return {
        ...state,
        others: state.others.concat([action.payload])
      }
    case types.SET_REQUESTED_SELF_USER:
      return {
        ...state,
        requestedSelf: action.payload
      };
    case types.REMOVE_OTHER_USER:
      const otherUserIndex = state.others.findIndex(otherUser => otherUser.userName === action.payload);
      return {
        ...state,
        others: Array.from(state.others).splice(otherUserIndex, 1)
      };
    default:
      return state;
  }
};

export default reducer;
