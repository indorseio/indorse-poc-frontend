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

function* approveUser({ payload }) {
  const { userId } = payload;
  yield put(actions.approveUser.start({ userId }));

  try {
    yield call(callApi, api.approveUser({ userId }));
    yield put(actions.approveUser.success({ userId }));
  } catch (error) {
    yield put(actions.approveUser.failure(error));
  }
}

function* watchApproveUser() {
  yield takeEvery(actionTypes.APPROVE_USER.REQUEST, approveUser);
}

function* disapproveUser({ payload }) {
  const { userId } = payload;
  yield put(actions.disapproveUser.start({ userId }));

  try {
    yield call(callApi, api.disapproveUser({ userId }));
    yield put(actions.disapproveUser.success({ userId }));
  } catch (error) {
    yield put(actions.disapproveUser.failure(error));
  }
}

function* watchDisapproveUser() {
  yield takeEvery(actionTypes.DISAPPROVE_USER.REQUEST, disapproveUser);
}

export default function* users() {
  yield fork(watchFetchUsers);
  yield fork(watchApproveUser);
  yield fork(watchDisapproveUser);
}
