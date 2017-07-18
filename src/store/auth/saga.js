import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { startSubmit, stopSubmit } from 'redux-form';
import jwtDecode from 'jwt-decode';

import * as types from './action-types';
import * as actions from './actions';
import * as api from 'api/config/auth';
import callApi from 'store/api/saga';
import routeTemplates from 'ui/common/routes/templates';
import * as storage from './storage';

function unwrapToken(token) {
  const decoded = jwtDecode(token);
  const { iat, exp } = decoded;
  const { _id: id, name, email, verified: emailVerified, approved } = decoded;
  return {
    token: { value: token, iat, exp },
    user: { id, name, email, emailVerified, approved }
  };
}

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

function* login({ payload: values, meta }) {
  const form = meta && meta.form;
  yield put(actions.login.start(values));
  if (form) yield put(startSubmit(form));

  try {
    const response = yield call(callApi, api.login(values));
    const { token } = response;
    storage.setToken(token);
    yield put(actions.login.success(unwrapToken(token)));
    if (form) yield put(stopSubmit(form));
    yield put(push(routeTemplates.root));
  } catch (error) {
    storage.deleteToken();
    yield put(actions.login.failure(error));
    if (form) yield put(stopSubmit(form, { _error: error.message }));
  }
}

function* watchLogin() {
  yield takeEvery(types.LOGIN.REQUEST, login);
}

function* logout() {
  yield put(actions.logout.start());

  try {
    yield call(callApi, api.logout());
    yield put(actions.logout.success());
    yield put(push(routeTemplates.root));
  } catch (error) {
    yield put(actions.logout.failure(error));
  } finally {
    storage.deleteToken();
  }
}

function* watchLogout() {
  yield takeEvery(types.LOGOUT.REQUEST, logout);
}

function* tryRestoreSession() {
  try {
    const token = yield call(storage.getToken);
    if (token) {
      yield put(actions.login.success(unwrapToken(token)));
      return true;
    } else {
      return false;
    }
  } catch(error) {
    // TODO: Dispatch some error action
    console.error(error);
    return false;
  }
}

export default function* auth() {
  yield call(tryRestoreSession);

  yield fork(watchSignUp);
  yield fork(watchVerifyEmail);
  yield fork(watchLogin);
  yield fork(watchLogout);
}
