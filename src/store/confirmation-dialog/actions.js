import * as types from './action-types';

import { defineAction } from 'store/common/action-helpers';

export const showConfirmationDialog = ({ message }) => defineAction(types.SHOW_CONFIRMATION_DIALOG, { message });

export const hideConfirmationDialog = () => defineAction(types.HIDE_CONFIRMATION_DIALOG);

export const confirm = () => defineAction(types.CONFIRM);

export const cancel = () => defineAction(types.CANCEL);
