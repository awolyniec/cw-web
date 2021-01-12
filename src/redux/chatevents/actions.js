import types from './types';

export const setChatEvents = chatEvents => ({
  type: types.SET_CHAT_EVENTS,
  payload: chatEvents
});

export const addChatEvent = chatEvent => ({
  type: types.ADD_CHAT_EVENT,
  payload: chatEvent
});

export const addMessageStillSending = chatEvent => ({
  type: types.ADD_MESSAGE_STILL_SENDING,
  payload: chatEvent
});

export const removeMessageStillSending = messageSentAt => ({
  type: types.REMOVE_MESSAGE_STILL_SENDING,
  payload: messageSentAt
});
