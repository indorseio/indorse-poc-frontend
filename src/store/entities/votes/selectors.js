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
  (entities, votesById, currentUserId) => denormalize(Object.keys(votesById), [schemas.vote], entities).filter(c => c.voter && c.voter.id === currentUserId)
);

export const selectVotesById = votesState;

window.denormalize = denormalize;
window.schemas = schemas;
