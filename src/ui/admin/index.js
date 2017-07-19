import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Switch, Route } from 'react-router-dom';

import routeTemplates from 'ui/common/routes/templates';

import Users from './users';

class Admin extends Component {
  render() {
    return (
      <Switch>
        <Route to={routeTemplates.admin.users} component={Users} />
      </Switch>
    );
  }
}

export default injectIntl(Admin);
