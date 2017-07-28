import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const fetchUsers = {
  request: () => defineAction(types.FETCH_USERS.REQUEST),
  start: () => defineAction(types.FETCH_USERS.START),
  failure: (error) => defineAction(types.FETCH_USERS.FAILURE, error),
};

export const approveUser = {
  request: ({ userId }) => defineAction(types.APPROVE_USER.REQUEST, { userId }),
  start: ({ userId }) => defineAction(types.APPROVE_USER.START),
  success: ({ userId }) => defineAction(types.APPROVE_USER.SUCCESS, { userId }),
  failure: (error) => defineAction(types.APPROVE_USER.FAILURE, error),
};

export const disapproveUser = {
  request: ({ userId }) => defineAction(types.DISAPPROVE_USER.REQUEST, { userId }),
  start: ({ userId }) => defineAction(types.DISAPPROVE_USER.START),
  success: ({ userId }) => defineAction(types.DISAPPROVE_USER.SUCCESS, { userId }),
  failure: (error) => defineAction(types.DISAPPROVE_USER.FAILURE, error),
};
