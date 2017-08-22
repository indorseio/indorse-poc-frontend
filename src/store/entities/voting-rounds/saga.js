import { delay } from 'redux-saga';
import { call, put, fork, select, all } from 'redux-saga/effects';
import moment from 'moment';

import * as actions from './actions';
import * as selectors from './selectors';
import * as helpers from './helpers';
import * as claimActions from 'store/entities/claims/actions';

const UPDATE_STATUSES_INTERVAL = 60000;
const UPDATE_STATUS_INTERVAL = 1000;

function* updateStatus({ votingRoundId }) {
  const votingRound = yield select(selectors.selectVotingRoundById, { id: votingRoundId });
  if (votingRound) {
    const status = helpers.calculateVotingRoundStatus(votingRound);
    yield put(actions.setVotingRoundStatus({ votingRoundId, status, statusUpdatedAt: Date.now() }))
  }
}

function* updateStatusTimer({ votingRoundId, endDate }) {
  while (moment().subtract(UPDATE_STATUS_INTERVAL, 'ms').isBefore(endDate)) {
    yield call(updateStatus, { votingRoundId });

    yield delay(UPDATE_STATUS_INTERVAL);
  }
}

function* checkEndingSoon({ votingRound, status }) {
  if (helpers.isRegistrationEndingSoon(votingRound, status, UPDATE_STATUSES_INTERVAL)) {
    yield call(updateStatusTimer, { votingRoundId:  votingRound.id, endDate: votingRound.endRegistration });
  } else if (helpers.isVotingEndingSoon(votingRound, status, UPDATE_STATUSES_INTERVAL)) {
    yield call(updateStatusTimer, { votingRoundId: votingRound.id, endDate: votingRound.endVoting });
    if (votingRound.claim && votingRound.claim.id)
      yield put(claimActions.fetchClaim.request({ claimId: votingRound.claim.id }))
  }
}

function* updateStatuses() {
  const votingRounds = yield select(selectors.selectVotingRounds);
  const statusesById = votingRounds.reduce((map, votingRound) => {
    map[votingRound.id] = helpers.calculateVotingRoundStatus(votingRound);
    return map;
  }, {});
  yield put(actions.setVotingRoundStatuses({ statusesById, statusUpdatedAt: Date.now() }));
  const calls = votingRounds.map(votingRound => call(checkEndingSoon, { votingRound, status: statusesById[votingRound.id] }));
  yield all(calls);
}

function* updateStatusesTimer() {
  while (true) {
    yield call(updateStatuses);

    yield delay(UPDATE_STATUSES_INTERVAL);
  }
}

export default function* votingRounds() {
  yield fork(updateStatusesTimer);
}
