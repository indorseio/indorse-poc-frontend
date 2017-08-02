import Immutable from 'seamless-immutable';

import * as entityActionTypes from 'store/entities/action-types';
import * as actionTypes from './action-types';

const initialState = Immutable({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case entityActionTypes.ADD_ENTITIES:
      return action.payload.votes ? state.merge(action.payload.votes) : state;
    case actionTypes.REGISTER_TO_VOTE.SUCCESS:
      const registeredVotes = {};
      registeredVotes[action.payload.voteId] = { registered: true };
      return state.merge(registeredVotes, { deep: true });
    default:
      return state;
  }
}
