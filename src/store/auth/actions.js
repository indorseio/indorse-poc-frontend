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

export const login = {
  request: (values, form) => defineAction(types.LOGIN.REQUEST, values, { form }),
  start: (values) => defineAction(types.LOGIN.START, values),
  success: ({ token, user }) => defineAction(types.LOGIN.SUCCESS, { token, user }),
  failure: (error) => defineAction(types.LOGIN.FAILURE, error),
};

export const logout = {
  request: () => defineAction(types.LOGOUT.REQUEST),
  start: () => defineAction(types.LOGOUT.START),
  success: () => defineAction(types.LOGOUT.SUCCESS),
  failure: (error) => defineAction(types.LOGOUT.FAILURE, error),
};

export const changePassword = {
  request: (values, form) => defineAction(types.CHANGE_PASSWORD.REQUEST, values, { form }),
  start: () => defineAction(types.CHANGE_PASSWORD.START),
  success: () => defineAction(types.CHANGE_PASSWORD.SUCCESS),
  failure: (error) => defineAction(types.CHANGE_PASSWORD.FAILURE, error),
};

export const forgotPassword = {
  request: (values, form) => defineAction(types.FORGOT_PASSWORD.REQUEST, values, { form }),
  start: () => defineAction(types.FORGOT_PASSWORD.START),
  success: () => defineAction(types.FORGOT_PASSWORD.SUCCESS),
  failure: (error) => defineAction(types.FORGOT_PASSWORD.FAILURE, error),
};

export const resetPassword = {
  request: (values, form) => defineAction(types.RESET_PASSWORD.REQUEST, values, { form }),
  start: () => defineAction(types.RESET_PASSWORD.START),
  success: () => defineAction(types.RESET_PASSWORD.SUCCESS),
  failure: (error) => defineAction(types.RESET_PASSWORD.FAILURE, error),
};
