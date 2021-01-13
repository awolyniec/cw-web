import _ from 'lodash';
import { all, call, takeLatest } from 'redux-saga/effects';

import webSocketService from '../../websockets';
import types from './types';
import * as actions from './actions';
import * as userActions from '../users/actions';
import * as chatEventActions from '../chatevents/actions';
import * as signInActions from '../signin/actions';
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

/*
  handlers for specific message types
*/

function* handleUserEnterChat(messageJSON) {
  const { data } = messageJSON;
  const { name, color } = data;
  const reduxState = store.getState();
  if (_.get(reduxState, "users.requestedSelf.name") === name) {
    resetChat();
    store.dispatch(userActions.setSelfUser(data));
  } else {
    store.dispatch(userActions.addOtherUser(data));
  }
  store.dispatch(chatEventActions.addChatEvent(messageJSON));
  store.dispatch(userActions.addUserColor({ name, color }));
  yield;
}

// TODO: make this not a generator function
function* handleInitialSlateOfOtherUsers(messageJSON) {
  const { data } = messageJSON;
  for (let user of data) {
    const { name, color } = user;
    store.dispatch(userActions.addOtherUser(user));
    store.dispatch(userActions.addUserColor({ name, color }));
  }
  yield;
}

function* handleChatMessage(messageJSON) {
  const { data } = messageJSON;
  const { user, sentAt } = data;

  // TODO: can I use selectors here?
  const reduxState = store.getState();
  const selfUserName = _.get(reduxState, "users.self.name");

  store.dispatch(chatEventActions.addChatEvent(messageJSON));
  const isSelfMessage = user === selfUserName;
  if (isSelfMessage) {
    store.dispatch(chatEventActions.removeMessageStillSending(new Date(sentAt)));
  }
  yield;
}

function* handleError(messageJSON) {
  const { data } = messageJSON;
  const { type, message } = data;
  if (type === 'signInFailed') {
    store.dispatch(signInActions.setSignInError(message));
    store.dispatch(userActions.setRequestedSelfUser(null));
  }
  yield;
}

// TODO: if receiving a message, check to see if it's a self message. If it's a self message, remove it from pending
export function* receiveMessageAsync({ payload: message }) {
  try {
    const messageJSON = JSON.parse(message);
    const { type } = messageJSON;
    if (type === 'userEnterChat') {
      yield handleUserEnterChat(messageJSON);
    } else if (type === 'initialSlateOfOtherUsers') {
      yield handleInitialSlateOfOtherUsers(messageJSON);
    } else if (type === 'message') {
      yield handleChatMessage(messageJSON);
    } else if (type === 'error') {
      yield handleError(messageJSON);
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