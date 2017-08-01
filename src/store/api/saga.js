import { call, select } from 'redux-saga/effects';

import { callApiJson } from 'api/call';
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

  return yield call(callApiJson, finalConfig);
}
