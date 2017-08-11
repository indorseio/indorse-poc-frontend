import React from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import classnames from 'classnames';
import { Helmet } from "react-helmet";

import styles from './index.module.scss';

const messages = defineMessages({
  title: {
    id: "votes.welcome.title",
    defaultMessage: "Welcome to Indorse"
  }
});

const Welcome = ({ intl: { formatMessage } }) => {
  return (<article className={classnames('container', styles.page)}>
    <Helmet>
      <title>{formatMessage(messages.title)}</title>
    </Helmet>
    <div className={classnames('row justify-content-center align-items-center', styles.pageRow)}>
      <div className="col-12 col-md-8 text-center">
        <header>
          <h1 className="text-primary">
            {formatMessage(messages.title)}
          </h1>
        </header>
        <main>
          <p className="lead">
            <FormattedMessage id="votes.welcome.no-votes" defaultMessage="You have not been assigned any claims to vote on" />
          </p>
          <p className="lead">
            <FormattedMessage id="votes.welcome.notification" defaultMessage="You will get an e-mail notification when the system assigns you a claim" />
          </p>
        </main>
      </div>
    </div>
  </article>
  );
};

export default injectIntl(Welcome);
