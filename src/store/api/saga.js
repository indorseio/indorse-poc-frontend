import { call, select } from 'redux-saga/effects';

import { callApiJson } from 'api/call';
import * as authSelectors from 'store/auth/selectors';

export default function* callApi(config) {
  let finalData = { ...config.data };

  if (config.requireAuth) {
    const token = yield select(authSelectors.token);
    const currentUser = yield select(authSelectors.currentUser);

    finalData = { ...finalData, token: token.value, email: currentUser.email };
  }

  const finalConfig = { ...config, data: finalData };
  return yield call(callApiJson, finalConfig);
}
