import { createSelector } from 'reselect';

const selectSignInState = state => state.signin;

export const selectSignInError = createSelector(
  [selectSignInState],
  signin => signin.error
);