import { take, put, race } from 'redux-saga/effects';

import * as actionTypes from './action-types';
import * as actions from './actions';

export function* confirmSaga(message) {
  yield put(actions.showConfirmationDialog(message));
  const { yes } = yield race({
    yes: take(actionTypes.CONFIRM),
    no: take(actionTypes.CANCEL)
  })
  yield put(actions.hideConfirmationDialog());
  return !!yes;
}
