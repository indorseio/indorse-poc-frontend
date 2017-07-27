import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as schemas from 'store/common/schemas';
import * as entityActions from 'store/entities/actions';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as api from 'api/config/claims';
import callApi from 'store/api/saga';

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

export default function* claims() {
  yield fork(watchFetchUserClaims);
}
