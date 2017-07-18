import { defineMessages } from 'react-intl';

import { fieldNames } from './model';

export const labels = defineMessages({
  [fieldNames.oldPassword]: {
    id: `auth.change-password.fields.oldPassword.label`,
    defaultMessage: 'Old Password'
  },
  [fieldNames.newPassword]: {
    id: `auth.change-password.fields.newPassword.label`,
    defaultMessage: 'New Password'
  },
  [fieldNames.newPasswordConfirmation]: {
    id: `auth.change-password.fields.newPasswordConfirmation.label`,
    defaultMessage: 'New Password Confirmation'
  },
});

export const buttons = defineMessages({
  submit: {
    id: 'auth.change-password.buttons.submit',
    defaultMessage: 'Change Password'
  }
});
