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
import AnonymousOnly from 'ui/common/auth/anonymous-only';
import Authenticated from 'ui/common/auth/authenticated';
import AllowedRoles from 'ui/common/auth/allowed-roles';

import Home from 'ui/home';
import SignUp from 'ui/auth/sign-up';
import VerificationEmailSent from 'ui/auth/verification-email-sent';
import VerifyEmail from 'ui/auth/verify-email';
import Login from 'ui/auth/login';
import ChangePassword from 'ui/auth/change-password';
import ForgotPassword from 'ui/auth/forgot-password';
import ResetPassword from 'ui/auth/reset-password';
import ApprovalRequired from 'ui/auth/approval-required';

import Admin from 'ui/admin';

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
            <Route exact path={routeTemplates.auth.signUp} component={AnonymousOnly(SignUp)} />
            <Route exact path={routeTemplates.auth.verificationEmailSent} component={AnonymousOnly(VerificationEmailSent)} />
            <Route exact path={routeTemplates.auth.verifyEmail} component={AnonymousOnly(VerifyEmail)} />
            <Route exact path={routeTemplates.auth.login} component={AnonymousOnly(Login)} />
            <Route exact path={routeTemplates.auth.forgotPassword} component={AnonymousOnly(ForgotPassword)} />
            <Route exact path={routeTemplates.auth.resetPassword} component={AnonymousOnly(ResetPassword)} />
            <Route exact path={routeTemplates.auth.approvalRequired} component={Authenticated(ApprovalRequired, { approvalRequired: false })} />
            <Layout>
              <Route exact path={routeTemplates.root} component={Authenticated(Home, { flash: false })} />
              <Route exact path={routeTemplates.auth.changePassword} component={Authenticated(ChangePassword)} />
              <Route path={routeTemplates.admin.root} component={AllowedRoles(Admin, { roles: ['admin'] })} />
            </Layout>
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default injectIntl(App);
