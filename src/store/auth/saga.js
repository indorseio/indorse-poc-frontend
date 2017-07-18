import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { startSubmit, stopSubmit } from 'redux-form';

import * as types from './action-types';
import * as actions from './actions';
import * as api from 'api/config/auth';
import callApi from 'store/api/saga';
import routeTemplates from 'ui/common/routes/templates';

function* signUp({ payload: values, meta }) {
  const form = meta && meta.form;
  yield put(actions.signUp.start(values));
  if (form) yield put(startSubmit(form));

  try {
    const response = yield call(callApi, api.signUp(values));
    yield put(actions.signUp.success(response));
    if (form) yield put(stopSubmit(form));
    yield put(push(routeTemplates.auth.verificationEmailSent));
  } catch (error) {
    yield put(actions.signUp.failure(error));
    if (form) yield put(stopSubmit(form, { _error: error.message }));
  }
}

function* watchSignUp() {
  yield takeEvery(types.SIGN_UP.REQUEST, signUp);
}

function* verifyEmail({ payload: values }) {
  yield put(actions.verifyEmail.start(values));

  try {
    const response = yield call(callApi, api.verifyEmail(values));
    yield put(actions.verifyEmail.success(response));
  } catch (error) {
    yield put(actions.verifyEmail.failure(error));
  }
}

function* watchVerifyEmail() {
  yield takeEvery(types.VERIFY_EMAIL.REQUEST, verifyEmail);
}

export default function* auth() {
  yield fork(watchSignUp);
  yield fork(watchVerifyEmail);
}
