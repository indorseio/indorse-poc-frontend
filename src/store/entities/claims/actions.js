import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const fetchUserClaims = {
  request: ({ userId }) => defineAction(types.FETCH_USER_CLAIMS.REQUEST, { userId }),
  start: ({ userId }) => defineAction(types.FETCH_USER_CLAIMS.START, { userId }),
  failure: (error) => defineAction(types.FETCH_USER_CLAIMS.FAILURE, error),
};
