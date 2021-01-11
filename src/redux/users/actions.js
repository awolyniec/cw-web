import types from './types';

export const setOtherUsers = users => ({
  type: types.SET_OTHER_USERS,
  payload: users
});

export const addOtherUser = user => ({
  type: types.ADD_OTHER_USER,
  payload: user
});

export const removeOtherUser = userName => ({
  type: types.REMOVE_OTHER_USER,
  payload: userName
});

export const setSelfUser = user => ({
  type: types.SET_SELF_USER,
  payload: user
});

export const setRequestedSelfUser = user => ({
  type: types.SET_REQUESTED_SELF_USER,
  payload: user
});

export const addUserColor = data => ({
  type: types.ADD_USER_COLOR,
  payload: data
});
