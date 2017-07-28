import { defineApiActionTypes } from 'store/common/action-helpers';

export const FETCH_USERS = defineApiActionTypes('users/FETCH_USERS');

export const APPROVE_USER = defineApiActionTypes('users/APPROVE_USER');

export const DISAPPROVE_USER = defineApiActionTypes('users/DISAPPROVE_USER');
