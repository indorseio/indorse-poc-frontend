import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Switch, Route } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './index.module.scss';
import { muiTheme } from 'ui/theme/config';

import Helmet from './helmet';
import Layout from './layout';

import Home from 'ui/home';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Helmet />
        <MuiThemeProvider muiTheme={muiTheme}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Layout>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default injectIntl(App);
