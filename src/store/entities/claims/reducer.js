import Immutable from 'seamless-immutable';

import * as entityActionTypes from 'store/entities/action-types';

const initialState = Immutable({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case entityActionTypes.ADD_ENTITIES:
      return action.payload.claims ? state.merge(action.payload.claims) : state;
    default:
      return state;
  }
}

require('./selectors');
