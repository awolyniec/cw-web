import types from './types';

export const setChatEvents = chatEvents => ({
  type: types.SET_CHAT_EVENTS,
  payload: chatEvents
});

export const addChatEvent = chatEvent => ({
  type: types.ADD_CHAT_EVENT,
  payload: chatEvent
});
