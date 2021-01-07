import { createSelector } from 'reselect';

const selectUsersState = state => state.users;

export const selectSelfUser = createSelector(
  [selectUsersState],
  users => users.self
);

export const selectOtherUsers = createSelector(
  [selectUsersState],
  users => users.others
);