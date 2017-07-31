import { createSelector } from 'reselect';

const authState = rootState => rootState.auth;

export const selectIsSignedUp = createSelector(
  authState,
  authState => authState.signedUp
);

export const selectEmailVerification = createSelector(
  authState,
  authState => authState.emailVerification
);

export const selectAuthToken = createSelector(
  authState,
  authState => authState.token
);

export const selectIsLoggedIn = createSelector(
  authState,
  authState => authState.loggedIn
);

export const selectCurrentUser = createSelector(
  authState,
  authState => authState.currentUser
);

export const selectIsCurrentUserAdmin = createSelector(
  selectCurrentUser,
  currentUser => currentUser ? currentUser.role === 'admin' : false
)

export const selectCurrentUserId = createSelector(
  authState,
  authState => authState.currentUser ? authState.currentUser.id : undefined
);

export const selectCurrentUserRole = createSelector(
  authState,
  authState => authState.currentUser ? authState.currentUser.role : undefined
);

export const selectIsForgotPasswordEmailSent = createSelector(
  authState,
  authState => authState.forgotPasswordEmailSent
);
