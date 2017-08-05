import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const fetchCurrentUserVotes = {
  request: () => defineAction(types.FETCH_CURRENT_USER_VOTES.REQUEST),
  start: () => defineAction(types.FETCH_CURRENT_USER_VOTES.START),
  success: () => defineAction(types.FETCH_CURRENT_USER_VOTES.SUCCESS),
  failure: (error) => defineAction(types.FETCH_CURRENT_USER_VOTES.FAILURE, error),
};

export const registerToVote = {
  request: ({ voteId }) => defineAction(types.REGISTER_TO_VOTE.REQUEST, { voteId }),
  start: ({ voteId, claimId }) => defineAction(types.REGISTER_TO_VOTE.START, { voteId, claimId }),
  success: ({ voteId, claimId }) => defineAction(types.REGISTER_TO_VOTE.SUCCESS, { voteId, claimId }),
  failure: (error) => defineAction(types.REGISTER_TO_VOTE.FAILURE, error)
};

export const endorse = {
  request: ({ voteId }) => defineAction(types.ENDORSE.REQUEST, { voteId }),
  start: ({ voteId, claimId }) => defineAction(types.ENDORSE.START, { voteId, claimId }),
  success: ({ voteId, claimId }) => defineAction(types.ENDORSE.SUCCESS, { voteId, claimId }),
  failure: (error) => defineAction(types.ENDORSE.FAILURE, error)
};

export const flag = {
  request: ({ voteId }) => defineAction(types.FLAG.REQUEST, { voteId }),
  start: ({ voteId, claimId }) => defineAction(types.FLAG.START, { voteId, claimId }),
  success: ({ voteId, claimId }) => defineAction(types.FLAG.SUCCESS, { voteId, claimId }),
  failure: (error) => defineAction(types.FLAG.FAILURE, error)
};
