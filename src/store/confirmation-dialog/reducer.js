import Immutable from 'seamless-immutable';
import * as types from './action-types';

const intialState = Immutable({
  open: false,
  message: undefined
});

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case types.SHOW_CONFIRMATION_DIALOG:
      return state.merge({
        open: true,
        message: action.payload.message
      })
    case types.HIDE_CONFIRMATION_DIALOG:
      return state.merge(intialState.asMutable());
    default:
      return state;
  }
}
