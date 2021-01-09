import { all, call } from 'redux-saga/effects';

import { webSocketSagas } from './websockets/sagas';

export default function* rootSaga() {
  yield all([
    call(webSocketSagas)
  ]);
}