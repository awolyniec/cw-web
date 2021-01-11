import _ from 'lodash';
import { all, call, takeLatest, put } from 'redux-saga/effects';

import webSocketService from '../../websockets';
import types from './types';
import * as actions from './actions';
import * as userActions from '../users/actions';
import * as chatEventActions from '../chatevents/actions';
import store from '../store';
import { resetChat } from '../helpers';

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

function* handleUserEnterChat(messageJSON) {
  const { data } = messageJSON;
  const { name } = data;
  const reduxState = store.getState();
  console.log(JSON.stringify(reduxState));
  if (_.get(reduxState, "users.requestedSelf.name") === name) {
    resetChat();
    store.dispatch(userActions.setSelfUser(data));
  } else {
    store.dispatch(userActions.addOtherUser(data));
  }
  store.dispatch(chatEventActions.addChatEvent(messageJSON));
  yield;
}

export function* receiveMessageAsync({ payload: message }) {
  try {
    const messageJSON = JSON.parse(message);
    const { type } = messageJSON;
    console.log("message: ", message);
    if (type === 'userEnterChat') {
      yield handleUserEnterChat(messageJSON);
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