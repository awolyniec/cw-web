import types from './types';

export const setSignInError = error => ({
  type: types.SET_SIGN_IN_ERROR,
  payload: error
});