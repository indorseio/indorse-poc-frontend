import { createSelector } from 'reselect';

const authState = rootState => rootState.auth;

export const signedUp = createSelector(
  authState,
  authState => authState.signedUp
);

export const emailVerification = createSelector(
  authState,
  authState => authState.emailVerification
);
