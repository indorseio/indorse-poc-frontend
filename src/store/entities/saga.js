import { fork } from 'redux-saga/effects';

import users from './users/saga';

export default function* entities() {
  yield fork(users);
};
