import Immutable from 'seamless-immutable';

import * as types from './action-types';

const initialState = Immutable({
  loggedIn: false,
  token: undefined,
  currentUser: undefined,
  signedUp: false,
  emailVerification: {
    verifying: false,
    verified: false,
    error: undefined
  },
  forgotPasswordEmailSent: false
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
    case types.LOGIN.SUCCESS:
      return state.merge({
        loggedIn: true,
        token: action.payload.token,
        currentUser: action.payload.user
      });
    case types.LOGIN.FAILURE:
    case types.LOGOUT.SUCCESS:
    case types.LOGOUT.FAILURE:
      return state.merge({
        loggedIn: false,
        token: undefined,
        currentUser: undefined
      });
    case types.FORGOT_PASSWORD.START:
      return state.merge({ forgotPasswordEmailSent: false });
    case types.FORGOT_PASSWORD.SUCCESS:
      return state.merge({ forgotPasswordEmailSent: true });
    case types.FORGOT_PASSWORD.FAILURE:
      return state.merge({ forgotPasswordEmailSent: false });
    default:
      return state;
  }
}
