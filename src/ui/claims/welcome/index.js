import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames';

import routeTemplates from 'ui/common/routes/templates';
import styles from './index.module.scss';

const Welcome = (props) => {
  return (<article className={classnames('container', styles.page)}>
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
        </main>
      </div>
    </div>
  </article>
  );
};

export default Welcome;
