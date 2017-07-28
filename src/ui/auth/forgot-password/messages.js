import { defineMessages } from 'react-intl';

import { fieldNames } from './model';

export const labels = defineMessages({
  [fieldNames.email]: {
    id: `auth.forgot-password.fields.email.label`,
    defaultMessage: 'E-mail'
  },
});

export const header = defineMessages({
  title: {
    id: 'auth.forgot-password.header.title',
    defaultMessage: 'Forgot Password'
  }
});

export const alerts = defineMessages({
  emailSent: {
    id: 'auth.forgot-password.email-sent',
    defaultMessage: "You will receive an email with instructions on how to reset your password in a few minutes."
  }
});

export const buttons = defineMessages({
  submit: {
    id: 'auth.forgot-password.buttons.submit',
    defaultMessage: 'Submit'
  }
});
