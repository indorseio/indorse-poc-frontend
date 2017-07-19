import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as schemas from 'store/common/schemas';
import * as entityActions from 'store/entities/actions';
import * as actionTypes from './action-types';
import * as actions from './actions';
import * as api from 'api/config/users';
import callApi from 'store/api/saga';

function* fetchUsers({ payload }) {
  const { userId } = payload;
  yield put(actions.fetchUsers.start({ userId }));

  try {
    const response = yield call(callApi, api.fetchUsers({ userId }));
    const schema = { users: [schemas.user] };
    const { entities } = normalize(response, schema);
    yield put(entityActions.addEntities(entities));
  } catch (error) {
    yield put(actions.fetchUsers.failure(error));
  }
}

function* watchFetchUsers() {
  yield takeEvery(actionTypes.FETCH_USERS.REQUEST, fetchUsers);
}

export default function* users() {
  yield fork(watchFetchUsers);
}
