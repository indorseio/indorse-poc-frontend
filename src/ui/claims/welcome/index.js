import React from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames';

import routeTemplates from 'ui/common/routes/templates';
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
      <div className="col-12 col-md-6 text-center">
        <header>
          <h1 className="text-primary">
            <FormattedMessage id="claims.welcome.title" defaultMessage="Welcome to Indorse" />
          </h1>
        </header>
        <main>
          <p className="lead">
            <FormattedMessage id="claims.welcome.no-claims" defaultMessage="You have not created any claims yet" />
          </p>
          <Link to={routeTemplates.claims.new}>
            <RaisedButton
              primary
              label={<FormattedMessage id="claims.welcome.links.new" defaultMessage="Create you first claim" />} />
          </Link>
          <p className="pt-5">
            <FormattedMessage 
            id="welcome.more-poc-info" 
            defaultMessage="Thank you for joining Indorse. For more information about what this POC is about, and what to expect please read this {link}"
            values={{ link: <a href="https://medium.com/joinindorse/indorse-dev-update-13-august-2017-249722f7630e" target="blank" rel="noreferrer noopener">Medium Blog post</a> }} />
          </p>
        </main>
      </div>
    </div>
  </article>
  );
};

export default injectIntl(Welcome);
