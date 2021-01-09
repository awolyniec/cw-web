import types from './types';

export const connectAndEnterChat = user => ({
  type: types.CONNECT_AND_ENTER_CHAT,
  payload: user
});

export const sendMessage = message => ({
  type: types.SEND_MESSAGE,
  payload: message
});

export const receiveMessage = message => ({
  type: types.RECEIVE_MESSAGE,
  payload: message
});