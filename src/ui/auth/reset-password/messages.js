import { defineMessages } from 'react-intl';

import { fieldNames } from './model';

export const labels = defineMessages({
  [fieldNames.password]: {
    id: `auth.reset-password.fields.newPassword.label`,
    defaultMessage: 'New Password'
  },
  [fieldNames.passwordConfirmation]: {
    id: `auth.reset-password.fields.newPasswordConfirmation.label`,
    defaultMessage: 'New Password Confirmation'
  },
});

export const header = defineMessages({
  title: {
    id: 'auth.reset-password.header.title',
    defaultMessage: 'Reset Password'
  }
});

export const buttons = defineMessages({
  submit: {
    id: 'auth.reset-password.buttons.submit',
    defaultMessage: 'Reset Password'
  }
});
