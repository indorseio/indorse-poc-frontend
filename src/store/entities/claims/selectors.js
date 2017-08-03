import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import * as schemas from 'store/common/schemas';
import * as entitySelectors from 'store/entities/selectors';
import * as authSelectors from 'store/auth/selectors';
import * as helpers from './helpers';
import * as voteHelpers from 'store/entities/votes/helpers';

const claimsState = createSelector(
  entitySelectors.selectEntities,
  entities => entities.claims
)

export const selectCurrentUserClaims = createSelector(
  entitySelectors.selectEntities,
  claimsState,
  authSelectors.selectCurrentUserId,
  (entities, claimsById, currentUserId) =>
    denormalize(Object.keys(claimsById), [schemas.claim], entities)
      .filter(c => c.owner && c.owner.id === currentUserId)
      .map(c => ({ ...c, status: helpers.calculateClaimStatus(c) }))
);

export const selectClaimById = createSelector(
  entitySelectors.selectEntities,
  (state, props) => props.id,
  (entities, id) => {
    const claim = denormalize(id, schemas.claim, entities);
    if (claim) {
      const result = { ...claim, status: helpers.calculateClaimStatus(claim) };
      if (claim.vote)
        result.vote = { ...claim.vote, status: voteHelpers.calculateVoteStatus(claim.vote) };
      return result;
    }
    return claim;
  }
);
