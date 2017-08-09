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
import { messageTypes, buildMessage } from 'store/flash/builder';
import messages from 'ui/auth/messages';

function unwrapToken(token) {
  const decoded = jwtDecode(token);
  const { iat, exp } = decoded;
  const { _id: id, name, email, verified: emailVerified, approved, role } = decoded;
  return {
    token: { value: token, iat, exp },
    user: { id, name, email, emailVerified, approved, role }
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
    yield put(push(routeTemplates.auth.login, {
      flash: buildMessage({ kind: messageTypes.success, content: messages.emailVerified })
    }));
  } catch (error) {
    yield put(actions.verifyEmail.failure(error));
  }
}

function* watchVerifyEmail() {
  yield takeEvery(types.VERIFY_EMAIL.REQUEST, verifyEmail);
}

function* resendVerificationEmail({ payload: values, meta }) {
  const form = meta && meta.form;
  yield put(actions.resendVerificationEmail.start(values));
  if (form) yield put(startSubmit(form));

  try {
    const response = yield call(callApi, api.resendVerificationEmail(values));
    yield put(actions.resendVerificationEmail.success(response));
    if (form) yield put(stopSubmit(form));
    yield put(push(routeTemplates.auth.verificationEmailSent));
  } catch (error) {
    yield put(actions.resendVerificationEmail.failure(error));
    if (form) yield put(stopSubmit(form, { _error: error.message }));
  }
}

function* watchResendVerificationEmail() {
  yield takeEvery(types.RESEND_VERIFICATION_EMAIL.REQUEST, resendVerificationEmail);
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
    yield put(push(routeTemplates.root, {
      flash: buildMessage({ kind: messageTypes.success, content: messages.loggedIn })
    }));
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

function* changePassword({ payload: values, meta }) {
  const form = meta && meta.form;
  yield put(actions.changePassword.start(values));
  if (form) yield put(startSubmit(form));

  try {
    const response = yield call(callApi, api.changePassword(values));
    yield put(actions.changePassword.success(response));
    if (form) yield put(stopSubmit(form));
    yield put(push(routeTemplates.root, {
      flash: buildMessage({ kind: messageTypes.success, content: messages.passwordChanged })
    }));
  } catch (error) {
    yield put(actions.changePassword.failure(error));
    if (form) yield put(stopSubmit(form, { _error: error.message }));
  }
}

function* watchChangePassword() {
  yield takeEvery(types.CHANGE_PASSWORD.REQUEST, changePassword);
}

function* forgotPassword({ payload: values, meta }) {
  const form = meta && meta.form;
  yield put(actions.forgotPassword.start(values));
  if (form) yield put(startSubmit(form));

  try {
    const response = yield call(callApi, api.forgotPassword(values));
    yield put(actions.forgotPassword.success(response));
    if (form) yield put(stopSubmit(form));
  } catch (error) {
    yield put(actions.forgotPassword.failure(error));
    if (form) yield put(stopSubmit(form, { _error: error.message }));
  }
}

function* watchForgotPassword() {
  yield takeEvery(types.FORGOT_PASSWORD.REQUEST, forgotPassword);
}

function* resetPassword({ payload: values, meta }) {
  const form = meta && meta.form;
  yield put(actions.resetPassword.start(values));
  if (form) yield put(startSubmit(form));

  try {
    const response = yield call(callApi, api.resetPassword(values));
    yield put(actions.resetPassword.success(response));
    if (form) yield put(stopSubmit(form));
    yield put(push(routeTemplates.auth.login, {
      flash: buildMessage({ kind: messageTypes.success, content: messages.passwordResetSuccess })
    }));
  } catch (error) {
    yield put(actions.resetPassword.failure(error));
    if (form) yield put(stopSubmit(form, { _error: error.message }));
  }
}

function* watchResetPassword() {
  yield takeEvery(types.RESET_PASSWORD.REQUEST, resetPassword);
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
  yield fork(watchResendVerificationEmail);
  yield fork(watchLogin);
  yield fork(watchLogout);
  yield fork(watchChangePassword);
  yield fork(watchForgotPassword);
  yield fork(watchResetPassword);
}
