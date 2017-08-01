import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const fetchCurrentUserVotes = {
  request: () => defineAction(types.FETCH_CURRENT_USER_VOTES.REQUEST),
  start: () => defineAction(types.FETCH_CURRENT_USER_VOTES.START),
  failure: (error) => defineAction(types.FETCH_CURRENT_USER_VOTES.FAILURE, error),
};
