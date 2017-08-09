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

export const header = defineMessages({
  title: {
    id: 'auth.login.header.title',
    defaultMessage: 'Login to your account'
  }
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
  },
  resendVerificationEmailPrompt: {
    id: 'auth.login.links.resend-verification-email.prompt',
    defaultMessage: "Didn't receive verification e-mail? {link}"
  },
  resendVerificationEmail: {
    id: 'auth.login.links.resend-verification-email',
    defaultMessage: "Re-send"
  },
  signUpPrompt: {
    id: 'auth.login.links.signUp.prompt',
    defaultMessage: 'New to {brand}? {link}'
  },
  signUp: {
    id: 'auth.login.links.signUp.link',
    defaultMessage: 'Sign Up'
  }
});
