import types from './types';

const INITIAL_STATE = {
  error: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_SIGN_IN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;