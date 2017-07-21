import React from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import routeTemplates from 'ui/common/routes/templates';

const messages = defineMessages({
  prompt: {
    id: 'auth.layout.footer.default.prompt',
    defaultMessage: '{login} or {signUp}'
  },
  login: {
    id: 'auth.layout.footer.default.login',
    defaultMessage: 'Login'
  },
  signUp: {
    id: 'auth.layout.footer.default.signUp',
    defaultMessage: 'Sign Up'
  }
});

const Footer = ({ intl: { formatMessage } }) => (
  <FormattedMessage {...messages.prompt} values={{
    login: <Link to={routeTemplates.auth.login}>{formatMessage(messages.login)}</Link>,
    signUp: <Link to={routeTemplates.auth.signUp}>{formatMessage(messages.signUp)}</Link>
  }} />
);

Footer.displayName = 'DefaultAuthFooter';

export default injectIntl(Footer);
