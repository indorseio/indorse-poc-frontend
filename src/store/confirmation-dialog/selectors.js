import { createSelector } from 'reselect';

const confirmationDialogState = state => state.confirmationDialog;

export const selectIsOpen = createSelector(
  confirmationDialogState,
  state => state.open
);

export const selectMessage = createSelector(
  confirmationDialogState,
  state => state.message
);
