import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const Home = (props) => (
  <header className="text-center">
    <FormattedMessage id="home.title" defaultMessage="Welcome" tagName="h1" />
  </header>
);

export default injectIntl(Home);
