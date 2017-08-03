import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import * as schemas from 'store/common/schemas';
import * as entitySelectors from 'store/entities/selectors';
import * as authSelectors from 'store/auth/selectors';

const claimsState = createSelector(
  entitySelectors.selectEntities,
  entities => entities.claims
)

export const selectCurrentUserClaims = createSelector(
  entitySelectors.selectEntities,
  claimsState,
  authSelectors.selectCurrentUserId,
  (entities, claimsById, currentUserId) => denormalize(Object.keys(claimsById), [schemas.claim], entities).filter(c => c.owner && c.owner.id === currentUserId)
);

export const selectClaimById = createSelector(
  entitySelectors.selectEntities,
  (state, props) => props.id,
  (entities, id) => denormalize(id, schemas.claim, entities)
)
