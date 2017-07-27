import { call, fork, put, takeEvery, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';

import * as schemas from 'store/common/schemas';
import * as entityActions from 'store/entities/actions';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as api from 'api/config/claims';
import * as authSelectors from 'store/auth/selectors'
import callApi from 'store/api/saga';
import routeTemplates from 'ui/common/routes/templates';
import { messageTypes, buildMessage } from 'store/flash/builder';
import messages from 'ui/claims/messages';

function* fetchUserClaims({ payload }) {
  const { userId } = payload;
  yield put(actions.fetchUserClaims.start({ userId }));

  try {
    const response = yield call(callApi, api.fetchUserClaims({ userId }));
    const schema = { claims: [schemas.claim] };
    const { entities } = normalize(response, schema);
    yield put(entityActions.addEntities(entities));
  } catch (error) {
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

    // TODO: Once API returns id after creation, replace this with entities update
    const currentUserId = yield select(authSelectors.currentUserId);
    yield put(actions.fetchUserClaims.request({ userId: currentUserId }));

    yield put(push(routeTemplates.dashboard.claims, {
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

export default function* claims() {
  yield fork(watchFetchUserClaims);
  yield fork(watchCreateClaim);
}
