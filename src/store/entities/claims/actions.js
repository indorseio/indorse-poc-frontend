import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const fetchUserClaims = {
  request: ({ userId }) => defineAction(types.FETCH_USER_CLAIMS.REQUEST, { userId }),
  start: ({ userId }) => defineAction(types.FETCH_USER_CLAIMS.START, { userId }),
  success: ({ userId }) => defineAction(types.FETCH_USER_CLAIMS.SUCCESS, { userId }),
  failure: (error) => defineAction(types.FETCH_USER_CLAIMS.FAILURE, error),
};

export const createClaim = {
  request: (values, form) => defineAction(types.CREATE_CLAIM.REQUEST, values, { form }),
  start: (values) => defineAction(types.CREATE_CLAIM.START, values),
  success: ({ token, claim }) => defineAction(types.CREATE_CLAIM.SUCCESS, { token, claim }),
  failure: (error) => defineAction(types.CREATE_CLAIM.FAILURE, error),
};

export const fetchClaim = {
  request: ({ claimId }) => defineAction(types.FETCH_CLAIM.REQUEST, { claimId }),
  start: ({ claimId }) => defineAction(types.FETCH_CLAIM.START, { claimId }),
  failure: (error) => defineAction(types.FETCH_CLAIM.FAILURE, error),
};
