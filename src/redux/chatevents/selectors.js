import { createSelector } from 'reselect';

const selectChatEventState = state => state.chatevents;

export const selectAllEvents = createSelector(
  [selectChatEventState],
  chatevents => chatevents.allEvents
);
