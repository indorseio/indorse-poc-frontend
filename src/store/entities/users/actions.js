import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const fetchUsers = {
  request: () => defineAction(types.FETCH_USERS.REQUEST),
  start: () => defineAction(types.FETCH_USERS.START),
  failure: (error) => defineAction(types.FETCH_USERS.FAILURE, error),
};
