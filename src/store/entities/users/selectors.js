import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import * as schemas from 'store/common/schemas';
import * as entitySelectors from 'store/entities/selectors';

const usersState = createSelector(
  entitySelectors.selectEntities,
  entities => entities.users
)

export const allUsers = createSelector(
  entitySelectors.selectEntities,
  usersState,
  (entities, usersById) => denormalize(Object.keys(usersById), [schemas.user], entities)
);
