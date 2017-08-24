import Immutable from 'seamless-immutable';

import * as actionTypes from './action-types';
import * as entityActionTypes from 'store/entities/action-types';

const initialState = Immutable({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case entityActionTypes.ADD_ENTITIES:
      return action.payload.votingRounds ? state.merge(action.payload.votingRounds) : state;
    case actionTypes.SET_VOTING_ROUND_STATUSES:
      const { statusesById } = action.payload;
      const patch = Object.keys(statusesById).reduce((res, id) => {
        res[id] = { status: statusesById[id], statusUpdatedAt: action.payload.statusUpdatedAt };
        return res;
      }, {});

      return state.merge(patch, { deep: true });
    case actionTypes.SET_VOTING_ROUND_STATUS:
      const statusVotingRound = {};
      statusVotingRound[action.payload.votingRoundId] = { status: action.payload.status, statusUpdatedAt: action.payload.statusUpdatedAt };
      return state.merge(statusVotingRound, { deep: true });
    default:
      return state;
  }
}
