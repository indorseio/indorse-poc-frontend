import { defineApiActionTypes } from 'store/common/action-helpers';

export const SIGN_UP = defineApiActionTypes('SIGN_UP');

export const VERIFY_EMAIL = defineApiActionTypes('VERIFY_EMAIL');

export const LOGIN = defineApiActionTypes('LOGIN');

export const LOGOUT = defineApiActionTypes('LOGOUT');

export const CHANGE_PASSWORD = defineApiActionTypes('CHANGE_PASSWORD');

export const FORGOT_PASSWORD = defineApiActionTypes('FORGOT_PASSWORD');

export const RESET_PASSWORD = defineApiActionTypes('RESET_PASSWORD');
