import { call, fork, put, takeEvery, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
// import { startSubmit, stopSubmit } from 'redux-form';
// import { push } from 'react-router-redux';

import * as schemas from 'store/common/schemas';
import * as entityActions from 'store/entities/actions';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as selectors from './selectors';
import * as api from 'api/config/votes';
import callApi from 'store/api/saga';
// import routeTemplates from 'ui/common/routes/templates';

function* fetchCurrentUserVotes({ payload }) {
  yield put(actions.fetchCurrentUserVotes.start());

  try {
    const response = yield call(callApi, api.fetchCurrentUserVotes());
    const schema = {
      results: [{
        claim: schemas.claim,
        vote: schemas.vote,
        votingRound: schemas.votingRound
      }]
    };
    const { entities } = normalize(response, schema);
    yield put(entityActions.addEntities(entities));
  } catch (error) {
    yield put(actions.fetchCurrentUserVotes.failure(error));
  }
}

function* watchFetchCurrentUserVotes() {
  yield takeEvery(actionTypes.FETCH_CURRENT_USER_VOTES.REQUEST, fetchCurrentUserVotes);
}

function* registerToVote({ payload }) {
  const { voteId } = payload;
  const vote = yield select(selectors.selectVoteById, { id: voteId });
  const claimId = vote.claim.id;

  yield put(actions.registerToVote.start({ voteId, claimId }));

  try {
    yield call(callApi, api.registerToVote({ claimId }));
    yield put(actions.registerToVote.success({ voteId, claimId }));
  } catch (error) {
    yield put(actions.registerToVote.failure(error));
  }
}

function* wathcRegisterToVote() {
  yield takeEvery(actionTypes.REGISTER_TO_VOTE.REQUEST, registerToVote);
}

export default function* votes() {
  yield fork(watchFetchCurrentUserVotes);
  yield fork(wathcRegisterToVote);
}
