import { call, select, put } from 'redux-saga/effects';

import { callApiJson } from 'api/call';
import * as authActions from 'store/auth/actions';
import * as authSelectors from 'store/auth/selectors';

export default function* callApi(config) {
  let finalConfig = { ...config };

  if (config.requireAuth) {
    const token = yield select(authSelectors.selectAuthToken);
    finalConfig.headers = {
      ...finalConfig.headers,
      'Authorization': `Bearer ${token.value}`
    }
  }

  try {
    const response = yield call(callApiJson, finalConfig);
    return response;
  } catch (error) {
    if (finalConfig.requireAuth && error.response && error.response.status === 401) {
      yield put(authActions.invalidateSession());
    }

    throw error;
  }
}
