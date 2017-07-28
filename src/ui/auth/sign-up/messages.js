import { defineMessages } from 'react-intl';

import { fieldNames } from './model';

export const labels = defineMessages({
  [fieldNames.name]: {
    id: `auth.sign-up.fields.name.label`,
    defaultMessage: 'Name'
  },
  [fieldNames.email]: {
    id: `auth.sign-up.fields.email.label`,
    defaultMessage: 'E-mail'
  },
  [fieldNames.password]: {
    id: `auth.sign-up.fields.password.label`,
    defaultMessage: 'Password'
  },
  [fieldNames.passwordConfirmation]: {
    id: `auth.sign-up.fields.passwordConfirmation.label`,
    defaultMessage: 'Password Confirmation'
  },
});

export const header = defineMessages({
  title: {
    id: 'auth.signUp.header.title',
    defaultMessage: 'Sign Up'
  }
});

export const buttons = defineMessages({
  submit: {
    id: 'auth.sign-up.buttons.submit',
    defaultMessage: 'Sign up'
  }
});

export const links = defineMessages({
  loginPrompt: {
    id: 'auth.signUp.links.login.prompt',
    defaultMessage: 'Already a member? {link}'
  },
  login: {
    id: 'auth.signUp.links.login.link',
    defaultMessage: 'Login'
  }
});
