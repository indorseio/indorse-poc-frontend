import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Switch, Route, Redirect } from 'react-router-dom';

import routeTemplates from 'ui/common/routes/templates';

import Users from './users';

class Admin extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from={routeTemplates.admin.root} to={routeTemplates.admin.users.index} />
        <Route exact to={routeTemplates.admin.users.index} component={Users} />
      </Switch>
    );
  }
}

export default injectIntl(Admin);
