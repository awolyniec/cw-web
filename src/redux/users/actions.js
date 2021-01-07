import types from './types';

export const signIn = user => ({
  type: types.SIGN_IN,
  payload: user
});

export const setOtherUsers = users => ({
  type: types.SET_OTHER_USERS,
  payload: users
});

export const addOtherUser = user => ({
  type: types.ADD_OTHER_USER,
  payload: user
});

export const setSelfUser = user => ({
  type: types.SET_SELF_USER,
  payload: user
});
