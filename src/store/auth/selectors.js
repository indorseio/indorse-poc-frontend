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

export const token = createSelector(
  authState,
  authState => authState.token
);

export const loggedIn = createSelector(
  authState,
  authState => authState.loggedIn
);

export const currentUser = createSelector(
  authState,
  authState => authState.currentUser
);

export const currentUserId = createSelector(
  authState,
  authState => authState.currentUser ? authState.currentUser.id : undefined
);
