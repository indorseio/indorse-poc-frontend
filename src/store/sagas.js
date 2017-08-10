import { fork } from 'redux-saga/effects';

import auth from 'store/auth/saga';
import entities from 'store/entities/saga';

export default function* rootSaga(raven) {
  try {
    yield fork(auth);
    yield fork(entities);
  } catch (ex) {
    raven.captureException(ex);
  }
}
