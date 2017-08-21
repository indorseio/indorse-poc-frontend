import { createMiddleware } from 'redux-beacon';
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';
import { LOCATION_CHANGE } from 'react-router-redux';

import { SIGN_UP, LOGIN } from 'store/auth/action-types';
import { CREATE_CLAIM } from 'store/entities/claims/action-types';
import { REGISTER_TO_VOTE, ENDORSE, FLAG } from 'store/entities/votes/action-types';

const pageView = action => ({
  hitType: 'pageview',
  page: action.payload && action.payload.pathname
});

const signupSuccess = action => ({
  hitType: 'event',
  eventCategory: 'auth',
  eventAction: 'loggedIn',
});

const loginSuccess = action => ({
  hitType: 'event',
  eventCategory: 'auth',
  eventAction: 'signedUp',
});

const createClaimSuccess = action => ({
  hitType: 'event',
  eventCategory: 'claims',
  eventAction: 'created',
  eventLabel: action.payload && action.payload.claim && action.payload.claim.length && action.payload.claim[0].title
});

const registerToVoteSuccess = action => ({
  hitType: 'event',
  eventCategory: 'votes',
  eventAction: 'registered',
  eventLabel: action.payload.claimId
});

const indorseSuccess = action => ({
  hitType: 'event',
  eventCategory: 'votes',
  eventAction: 'indorsed',
  eventLabel: action.payload.claimId
});

const flagSuccess = action => ({
  hitType: 'event',
  eventCategory: 'votes',
  eventAction: 'flagged',
  eventLabel: action.payload.claimId
});

const eventsMap = {
  [LOCATION_CHANGE]: pageView,
  [SIGN_UP.SUCCESS]: signupSuccess,
  [LOGIN.SUCCESS]: loginSuccess,
  [CREATE_CLAIM.SUCCESS]: createClaimSuccess,
  [REGISTER_TO_VOTE.SUCCESS]: registerToVoteSuccess,
  [ENDORSE.SUCCESS]: indorseSuccess,
  [FLAG.SUCCESS]: flagSuccess
};

export default createMiddleware(eventsMap, GoogleAnalytics);
