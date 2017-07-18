import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const signUp = {
  request: (values, form) => defineAction(types.SIGN_UP.REQUEST, values, { form }),
  start: (values) => defineAction(types.SIGN_UP.START, values),
  success: (response) => defineAction(types.SIGN_UP.SUCCESS, response),
  failure: (error) => defineAction(types.SIGN_UP.FAILURE, error),
};

export const verifyEmail = {
  request: (values) => defineAction(types.VERIFY_EMAIL.REQUEST, values),
  start: (values) => defineAction(types.VERIFY_EMAIL.START, values),
  success: (response) => defineAction(types.VERIFY_EMAIL.SUCCESS, response),
  failure: (error) => defineAction(types.VERIFY_EMAIL.FAILURE, error),
};
