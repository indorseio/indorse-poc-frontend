import { defineMessages } from 'react-intl';

import { fieldNames } from './model';

export const labels = defineMessages({
  [fieldNames.email]: {
    id: `auth.login.fields.email.label`,
    defaultMessage: 'E-mail'
  },
  [fieldNames.password]: {
    id: `auth.login.fields.name.password`,
    defaultMessage: 'Password'
  },
});

export const buttons = defineMessages({
  submit: {
    id: 'auth.login.buttons.submit',
    defaultMessage: 'Login'
  }
});

export const links = defineMessages({
  forgotPassword: {
    id: 'auth.login.links.forgot-password',
    defaultMessage: 'Forgot Password?'
  }
});
