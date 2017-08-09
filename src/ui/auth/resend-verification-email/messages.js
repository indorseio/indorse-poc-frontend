import { defineMessages } from 'react-intl';

import { fieldNames } from './model';

export const labels = defineMessages({
  [fieldNames.email]: {
    id: `auth.resend-verification-email.fields.email.label`,
    defaultMessage: 'E-mail'
  },
});

export const header = defineMessages({
  title: {
    id: 'auth.resend-verification-email.header.title',
    defaultMessage: 'Re-send Verification Email'
  }
});

export const alerts = defineMessages({
  emailSent: {
    id: 'auth.resend-verification-email.email-sent',
    defaultMessage: "A message with a verification link has been sent to your email address. Please follow the link to verify your email."
  }
});

export const buttons = defineMessages({
  submit: {
    id: 'auth.resend-verification-email.buttons.submit',
    defaultMessage: 'Submit'
  }
});
