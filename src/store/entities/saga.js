import { fork } from 'redux-saga/effects';

import users from './users/saga';
import claims from './claims/saga';

export default function* entities() {
  yield fork(users);
  yield fork(claims);
};
