import { defineMessages } from 'react-intl';

import { fieldNames } from './model';

export const labels = defineMessages({
  [fieldNames.title]: {
    id: `claims.new.fields.title.label`,
    defaultMessage: 'Title'
  },
  [fieldNames.description]: {
    id: `claims.new.fields.description.label`,
    defaultMessage: 'Description'
  },
  [fieldNames.proof]: {
    id: `claims.new.fields.proof.label`,
    defaultMessage: 'Proof'
  },
});

export const header = defineMessages({
  title: {
    id: 'claims.new.header.title',
    defaultMessage: 'Create a new claim'
  }
});

export const buttons = defineMessages({
  submit: {
    id: 'claims.new.buttons.submit',
    defaultMessage: 'Submit'
  }
});
