import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Paper from 'material-ui/Paper';

import brand from 'resources/brand';
import styles from './index.module.scss';
import routeTemplates from 'ui/common/routes/templates';
import Flash from 'ui/common/flash';
import DefaultFooter from './footer';

const Layout = ({ title, children, showFooter = true, footerContent, standalone = true }) => (
  <div className={classnames('container-fluid', 'px-0', 'py-5', styles.auth)}>
    <div className={classnames('row align-items-center no-gutters', styles.auth)}>
      <div className="col col-sm-3 col-lg-4"></div>
      <div className="col-12 col-sm-6 col-lg-4 px-3">
        {standalone && <Link to={routeTemplates.root} className={styles.logo}>
          <h1 className="card-title text-center mb-5">
            <img src={brand.logo.white} alt="Logo" height="50" className="mr-2" />
            {brand.name}
          </h1>
        </Link>}
        <Paper zDepth={2}>
          <div className="card">
            <div className="card-block">
              {title && <h2 className="text-center text-primary mb-3">{title}</h2>}
              <Flash />
              {children}
            </div>
            {showFooter && <div className="card-footer text-center text-muted py-3">
              {footerContent || <DefaultFooter />}
            </div>}
          </div>
        </Paper>
      </div>
      <div className="col col-sm-3 col-lg-4"></div>
    </div>
  </div>
);

Layout.displayName = "AuthLayout";

export default Layout;
