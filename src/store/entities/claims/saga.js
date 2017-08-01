import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';

import * as schemas from 'store/common/schemas';
import * as entityActions from 'store/entities/actions';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as api from 'api/config/claims';
import callApi from 'store/api/saga';
import routeTemplates from 'ui/common/routes/templates';
import { messageTypes, buildMessage } from 'store/flash/builder';
import messages from 'ui/claims/messages';

function* fetchUserClaims({ payload }) {
  const { userId } = payload;
  yield put(actions.fetchUserClaims.start({ userId }));

  try {
    const response = yield call(callApi, api.fetchUserClaims({ userId }));
    const schema = {
      claims: [{
        claim: schemas.claim,
        vote: schemas.vote,
        votingRound: schemas.votingRound
      }]
    };
    const { entities } = normalize(response, schema);
    yield put(entityActions.addEntities(entities));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchUserClaims.failure(error));
  }
}

function* watchFetchUserClaims() {
  yield takeEvery(actionTypes.FETCH_USER_CLAIMS.REQUEST, fetchUserClaims);
}

function* createClaim({ payload: values, meta }) {
  const form = meta && meta.form;
  yield put(actions.createClaim.start(values));
  if (form) yield put(startSubmit(form));

  try {
    const response = yield call(callApi, api.createClaim(values));
    yield put(actions.createClaim.success(response));
    if (form) yield put(stopSubmit(form));

    const schema = {
      claim: schemas.claim,
      vote: schemas.vote,
      votingRound: schemas.votingRound
    };
    const { entities } = normalize(response, schema);
    yield put(entityActions.addEntities(entities));

    yield put(push(routeTemplates.claims.my, {
      flash: buildMessage({ kind: messageTypes.success, content: messages.created })
    }));
  } catch (error) {
    yield put(actions.createClaim.failure(error));
    if (form) yield put(stopSubmit(form, { _error: error.message }));
  }
}

function* watchCreateClaim() {
  yield takeEvery(actionTypes.CREATE_CLAIM.REQUEST, createClaim);
}

function* fetchClaim({ payload }) {
  const { claimId } = payload;
  yield put(actions.fetchClaim.start({ claimId }));

  try {
    const response = yield call(callApi, api.fetchClaim({ claimId }));
    const schema = { claim: schemas.claim };
    const { entities } = normalize(response, schema);
    yield put(entityActions.addEntities(entities));
  } catch (error) {
    yield put(actions.fetchClaim.failure(error));
  }
}

function* watchFetchClaim() {
  yield takeEvery(actionTypes.FETCH_CLAIM.REQUEST, fetchClaim);
}

export default function* claims() {
  yield fork(watchFetchUserClaims);
  yield fork(watchCreateClaim);
  yield fork(watchFetchClaim);
}
