import { call, select } from 'redux-saga/effects';

import { callApiJson } from 'api/call';
import * as authSelectors from 'store/auth/selectors';

const preferedAuthFormat = process.env.REACT_APP_PREFERED_AUTH_FORMAT;

export default function* callApi(config) {
  let finalConfig = { ...config };

  if (config.requireAuth) {
    if (preferedAuthFormat === 'header') {
      const token = yield select(authSelectors.selectAuthToken);
      finalConfig.headers = {
        ...finalConfig.headers,
        'Authorization': `Bearer ${token.value}`
      }
    } else {
      const token = yield select(authSelectors.selectAuthToken);
      const currentUser = yield select(authSelectors.selectCurrentUser);
      finalConfig.data = { ...finalConfig.data, token: token.value, email: currentUser.email };
    }
  }

  return yield call(callApiJson, finalConfig);
}
