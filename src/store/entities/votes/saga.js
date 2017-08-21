import { call, fork, put, takeEvery, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as schemas from 'store/common/schemas';
import * as entityActions from 'store/entities/actions';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as selectors from './selectors';
import * as api from 'api/config/votes';
import callApi from 'store/api/saga';
import * as flashActions from 'store/flash/actions';
import { messageTypes } from 'store/flash/builder';
import votesMessages from 'ui/votes/messages';
import { confirmSaga as confirm } from 'store/confirmation-dialog/saga';
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
    yield put(actions.fetchCurrentUserVotes.success());
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
  const claim = vote.claim;
  const confirmationMessage = {
    ...votesMessages.confirmRegistration,
    values: { title: claim.title }
  }
  const confirmed = yield call(confirm, { message: confirmationMessage });
  if (!confirmed) {
    return;
  }

  const claimId = claim.id;
  yield put(actions.registerToVote.start({ voteId, claimId }));

  try {
    yield call(callApi, api.registerToVote({ claimId }));
    yield put(actions.registerToVote.success({ voteId, claimId }));
  } catch (error) {
    yield put(actions.registerToVote.failure(error));
    if (error && error.message)
      yield put(flashActions.addMessage({ kind: messageTypes.danger, content: error.message }));
  }
}

function* watchRegisterToVote() {
  yield takeEvery(actionTypes.REGISTER_TO_VOTE.REQUEST, registerToVote);
}

function* endorse({ payload }) {
  const { voteId } = payload;
  const vote = yield select(selectors.selectVoteById, { id: voteId });
  const claimId = vote.claim.id;

  yield put(actions.endorse.start({ voteId, claimId }));

  try {
    yield call(callApi, api.endorse({ claimId }));
    yield put(actions.endorse.success({ voteId, claimId }));
  } catch (error) {
    yield put(actions.endorse.failure(error));
    if (error && error.message)
      yield put(flashActions.addMessage({ kind: messageTypes.danger, content: error.message }));
  }
}

function* watchEndorse() {
  yield takeEvery(actionTypes.ENDORSE.REQUEST, endorse);
}

function* flag({ payload }) {
  const { voteId } = payload;
  const vote = yield select(selectors.selectVoteById, { id: voteId });
  const claimId = vote.claim.id;

  yield put(actions.flag.start({ voteId, claimId }));

  try {
    yield call(callApi, api.flag({ claimId }));
    yield put(actions.flag.success({ voteId, claimId }));
  } catch (error) {
    yield put(actions.flag.failure(error));
    if (error && error.message)
      yield put(flashActions.addMessage({ kind: messageTypes.danger, content: error.message }));
  }
}

function* watchFlag() {
  yield takeEvery(actionTypes.FLAG.REQUEST, flag);
}

export default function* votes() {
  yield fork(watchFetchCurrentUserVotes);
  yield fork(watchRegisterToVote);
  yield fork(watchEndorse);
  yield fork(watchFlag);
}
