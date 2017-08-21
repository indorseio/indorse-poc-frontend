import { fork } from 'redux-saga/effects';

import users from './users/saga';
import claims from './claims/saga';
import votes from './votes/saga';
import votingRounds from './voting-rounds/saga';

export default function* entities() {
  yield fork(users);
  yield fork(claims);
  yield fork(votes);
  yield fork(votingRounds);
};
