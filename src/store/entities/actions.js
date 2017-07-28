import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const addEntities = (entities) => defineAction(types.ADD_ENTITIES, entities);
