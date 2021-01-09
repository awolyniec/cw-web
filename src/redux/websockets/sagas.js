import _ from 'lodash';
import { all, call, takeLatest, put } from 'redux-saga/effects';

import webSocketService from '../../websockets';
import types from './types';
import * as actions from './actions';
import store from '../store';

export function* sendMessageAsync({ payload: message }) {
  try {
    yield webSocketService.send(message);
  } catch(error) {
    console.error(error);
    // TODO: dispatch error event
  }
}

export function* onSendMessage() {
  yield takeLatest(types.SEND_MESSAGE, sendMessageAsync);
}

export function* receiveMessageAsync({ payload: message }) {
  try {
    const messageJSON = JSON.parse(message);
    const { type } = messageJSON;
    console.log("message: ", message);
    if (type === 'userEnterChat') {
      const { userName, color } = messageJSON;
      const reduxState = store.getState();
      console.log(JSON.stringify(reduxState));
      if (_.get(reduxState, "users.requestedSelf.name") === userName) {
        console.log("self user");
        // TODO: fill in actions
      } else {
        console.log("other user");
        // TODO: fill in actions
      }
      // TODO: create chat event
    }
    yield;
  } catch(error) {
    console.error(error);
    // TODO: dispatch error event
  }
}

export function* onReceiveMessage() {
  yield takeLatest(types.RECEIVE_MESSAGE, receiveMessageAsync);
}

export function* connectAndEnterChatAsync({ payload: user }) {
  try {
    const { name, color } = user;
    const userSignInMessage = JSON.stringify({
      type: 'userEnterChat',
      data: {
        userName: name,
        color
      }
    });
    if (webSocketService.getReadyState() === 1) {
      // already connected; just sign in
      store.dispatch(actions.sendMessage(userSignInMessage))
    } else {
      // not connected yet; need to connect before signing in
      const onOpenCb = () => {
        store.dispatch(actions.sendMessage(userSignInMessage))
      };
      const onMessageCb = (messageEvent) => {
        store.dispatch(actions.receiveMessage(messageEvent.data));
      };
      yield webSocketService.open(onOpenCb, onMessageCb);
    }
  } catch (error) {
    console.error(error);
    // TODO: dispatch error event
  }
}

export function* onConnectAndEnterChat() {
  yield takeLatest(types.CONNECT_AND_ENTER_CHAT, connectAndEnterChatAsync);
}

export function* webSocketSagas() {
  yield all([
    call(onReceiveMessage),
    call(onSendMessage),
    call(onConnectAndEnterChat)
  ]);
}