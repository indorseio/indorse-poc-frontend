import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

import styles from './index.module.scss';

const Welcome = (props) => {
  return (<article className={classnames('container', styles.page)}>
    <div className={classnames('row justify-content-center align-items-center', styles.pageRow)}>
      <div className="col-12 col-md-8 text-center">
        <header>
          <h1 className="text-primary">
            <FormattedMessage id="votes.welcome.title" defaultMessage="Welcome to Indorse" />
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

export default Welcome;
