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
    case actionTypes.ENDORSE.SUCCESS:
      const endorsedVotes = {
        [action.payload.voteId]: { endorsed: true, votedAt: Date.now() }
      };
      return state.merge(endorsedVotes, { deep: true });
    case actionTypes.FLAG.SUCCESS:
      const flaggedVotes = {
        [action.payload.voteId]: { endorsed: false, votedAt: Date.now() }
      };
      return state.merge(flaggedVotes, { deep: true });
    default:
      return state;
  }
}
