import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Switch, Route } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './index.module.scss';
import { muiTheme } from 'ui/theme/config';

import Helmet from './helmet';
import Layout from './layout';

import routeTemplates from 'ui/common/routes/templates';
import Home from 'ui/home';
import SignUp from 'ui/auth/sign-up';
import VerificationEmailSent from 'ui/auth/verification-email-sent';
import VerifyEmail from 'ui/auth/verify-email';
import Login from 'ui/auth/login';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Helmet />
        <MuiThemeProvider muiTheme={muiTheme}>
          <Switch>
            <Route exact path={routeTemplates.auth.signUp} component={SignUp} />
            <Route exact path={routeTemplates.auth.verificationEmailSent} component={VerificationEmailSent} />
            <Route exact path={routeTemplates.auth.verifyEmail} component={VerifyEmail} />
            <Route exact path={routeTemplates.auth.login} component={Login} />
            <Layout>
              <Route exact path={routeTemplates.root} component={Home} />
            </Layout>
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default injectIntl(App);
