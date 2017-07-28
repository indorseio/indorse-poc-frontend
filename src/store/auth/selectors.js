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

export const currentUserIsAdmin = createSelector(
  currentUser,
  currentUser => currentUser ? currentUser.role === 'admin' : false
)

export const currentUserId = createSelector(
  authState,
  authState => authState.currentUser ? authState.currentUser.id : undefined
);

export const currentUserRole = createSelector(
  authState,
  authState => authState.currentUser ? authState.currentUser.role : undefined
);

export const forgotPasswordEmailSent = createSelector(
  authState,
  authState => authState.forgotPasswordEmailSent
);
