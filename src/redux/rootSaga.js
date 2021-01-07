import { all, call } from 'redux-saga/effects';

import { userSagas } from './users/sagas';
import { eventSagas } from './events/sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(eventSagas)
  ]);
}