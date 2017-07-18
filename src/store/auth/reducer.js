import Immutable from 'seamless-immutable';

import * as types from './action-types';

const initialState = Immutable({
  signedUp: false,
  emailVerification: {
    verifying: false,
    verified: false,
    error: undefined
  }
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_UP.START:
      return state.set('signedUp', false);
    case types.SIGN_UP.SUCCESS:
      return state.set('signedUp', true);
    case types.SIGN_UP.FAILURE:
      return state.set('signedUp', false);
    case types.VERIFY_EMAIL.START:
      return state.merge({
        emailVerification: {
          verifying: true,
          verified: false,
          error: undefined
        }
      });
    case types.VERIFY_EMAIL.SUCCESS:
      return state.merge({
        emailVerification: {
          verifying: false,
          verified: true,
          error: undefined
        }
      });
    case types.VERIFY_EMAIL.FAILURE:
      return state.merge({
        emailVerification: {
          verifying: false,
          verified: false,
          error: action.payload.message
        }
      });
    default:
      return state;
  }
}
