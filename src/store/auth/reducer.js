import Immutable from 'seamless-immutable';

import * as types from './action-types';
import * as claimActionTypes from 'store/entities/claims/action-types';
import * as voteActionTypes from 'store/entities/votes/action-types';

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
  forgotPasswordEmailSent: false,
  currentUserClaimsFetched: false,
  currentUserVotesFetched: false,
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
    case types.FETCH_CURRENT_USER.SUCCESS:
      return state.merge({
        currentUser: action.payload.user
      });
    case types.FORGOT_PASSWORD.START:
      return state.merge({ forgotPasswordEmailSent: false });
    case types.FORGOT_PASSWORD.SUCCESS:
      return state.merge({ forgotPasswordEmailSent: true });
    case types.FORGOT_PASSWORD.FAILURE:
      return state.merge({ forgotPasswordEmailSent: false });
    case claimActionTypes.FETCH_USER_CLAIMS.START:
      const { userId: fetchingUserId } = action.payload;
      const fetchingCurrentUserId = state.currentUser ? state.currentUser.id : undefined;
      return fetchingUserId === fetchingCurrentUserId ? state.merge({ currentUserClaimsFetched: false }) : state;
    case claimActionTypes.FETCH_USER_CLAIMS.SUCCESS:
      const { userId: fetchedUserId } = action.payload;
      const fetchedCurrentUserId = state.currentUser ? state.currentUser.id : undefined;
      return fetchedUserId === fetchedCurrentUserId ? state.merge({ currentUserClaimsFetched: true }) : state;
    case voteActionTypes.FETCH_CURRENT_USER_VOTES.START:
      return state.merge({ currentUserVotesFetched: false });
    case voteActionTypes.FETCH_CURRENT_USER_VOTES.SUCCESS:
      return state.merge({ currentUserVotesFetched: true });
    default:
      return state;
  }
}
