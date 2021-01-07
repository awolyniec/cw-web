import { all, call, takeLatest, put } from 'redux-saga/effects';

import webSocketService from '../../websockets';

import types from './types';

export function* signInAsync() {
  try {
    // TODO: call message-sending function
  } catch (error) {
    // TODO: error-handling (add error event?)
  }
}

export function* onSignIn() {
  yield takeLatest(types.SIGN_IN, signInAsync);
}

export function* userSagas() {
  yield all([
    call(onSignIn)
  ]);
}