import types from './types';

const INITIAL_STATE = {
  self: null,
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
    default:
      return state;
  }
};

export default reducer;
