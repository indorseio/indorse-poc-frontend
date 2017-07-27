import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import * as schemas from 'store/common/schemas';
import * as entitySelectors from 'store/entities/selectors';
import * as authSelectors from 'store/auth/selectors';

const claimsState = createSelector(
  entitySelectors.selectEntities,
  entities => entities.claims
)

export const currentUserClaims = createSelector(
  entitySelectors.selectEntities,
  claimsState,
  authSelectors.currentUserId,
  (entities, claimsById, currentUserId) => denormalize(Object.keys(claimsById), [schemas.claim], entities).filter(c => c.owner && c.owner.id === currentUserId)
);
