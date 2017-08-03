import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import * as schemas from 'store/common/schemas';
import * as entitySelectors from 'store/entities/selectors';
import * as authSelectors from 'store/auth/selectors';

const votesState = createSelector(
  entitySelectors.selectEntities,
  entities => entities.votes
)

export const selectCurrentUserVotes = createSelector(
  entitySelectors.selectEntities,
  votesState,
  authSelectors.selectCurrentUserId,
  (entities, votesById, currentUserId) => denormalize(Object.keys(votesById), [schemas.vote], entities).filter(v => v.voter && v.voter.id === currentUserId && v.claim && v.claim.owner && v.claim.owner.id !== currentUserId)
);

export const selectVoteById = createSelector(
  entitySelectors.selectEntities,
  (state, props) => props.id,
  (entities, id) => denormalize(id, schemas.vote, entities)
)
