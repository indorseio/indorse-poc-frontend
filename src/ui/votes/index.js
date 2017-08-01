import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Switch, Route } from 'react-router-dom';

import routeTemplates from 'ui/common/routes/templates';

import MyVotes from './my';

class Votes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={routeTemplates.votes.root} component={MyVotes} />
      </Switch>
    );
  }
}

export default injectIntl(Votes);
