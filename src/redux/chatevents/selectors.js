import { createSelector } from 'reselect';

const selectChatEventState = state => state.chatevents;

export const selectAllEvents = createSelector(
  [selectChatEventState],
  chatevents => chatevents.allEvents
);

export const selectMessagesStillSending = createSelector(
  [selectChatEventState],
  chatevents => chatevents.messagesStillSending
);
