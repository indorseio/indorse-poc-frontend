import Immutable from 'seamless-immutable';

import * as entityActionTypes from 'store/entities/action-types';
import * as actionTypes from './action-types';

const initialState = Immutable({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case entityActionTypes.ADD_ENTITIES:
      return action.payload.users ? state.merge(action.payload.users) : state;
    case actionTypes.APPROVE_USER.SUCCESS:
      const approvedUsers = {};
      approvedUsers[action.payload.userId] = { approved: true };
      return state.merge(approvedUsers, { deep: true });
    case actionTypes.DISAPPROVE_USER.SUCCESS:
      const disapprovedUsers = {};
      disapprovedUsers[action.payload.userId] = { approved: false };
      return state.merge(disapprovedUsers, { deep: true });
    default:
      return state;
  }
}
