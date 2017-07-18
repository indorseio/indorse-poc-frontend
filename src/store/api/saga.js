import { call } from 'redux-saga/effects';

import { callApiJson } from 'api/call';

export default function* callApi(config) {
  return yield call(callApiJson, config);
}
