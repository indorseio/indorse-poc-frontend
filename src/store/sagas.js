import { fork } from 'redux-saga/effects';

import auth from 'store/auth/saga';
import entities from 'store/entities/saga';

export default function* rootSaga() {
  yield fork(auth);
  yield fork(entities);
}
