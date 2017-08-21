import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import * as schemas from 'store/common/schemas';
import * as entitySelectors from 'store/entities/selectors';

const votingRoundsState = createSelector(
  entitySelectors.selectEntities,
  entities => entities.votingRounds
);

export const selectVotingRounds = createSelector(
  entitySelectors.selectEntities,
  votingRoundsState,
  (entities, votingRoundsById) =>
    denormalize(Object.keys(votingRoundsById), [schemas.votingRound], entities)
);

export const selectVotingRoundById = createSelector(
  entitySelectors.selectEntities,
  (state, props) => props.id,
  (entities, id) => denormalize(id, schemas.votingRound, entities)
);
