import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { defineMessages } from 'react-intl';

import { loggedIn } from 'store/auth/selectors';
import routeTemplates from 'ui/common/routes/templates';
import { buildMessage } from 'store/flash/builder';

const messages = defineMessages({
  authenticationRequired: {
    id: 'common.auth.authenticated.required',
    defaultMessage: 'You need to login first'
  }
});

function mapStateToProps(state) {
  return {
    loggedIn: loggedIn(state)
  }
}

const Authenticated = (WrappedComponent, { flash = true } = {}) => {
  class Wrapper extends React.Component {
    render() {
      const { loggedIn, ...passThrough } = this.props;

      if (loggedIn) {
        return <WrappedComponent {...passThrough} />;
      }
      else {
        return <Redirect to={{
          pathname: routeTemplates.auth.login,
          state: flash ? {
            flash: buildMessage({
              id: 'authentication-required',
              kind: 'danger',
              content: messages.authenticationRequired
            })
          } : undefined
        }} />
      }
    }
  }

  Wrapper.displayName = 'Authenticated';

  return connect(mapStateToProps)(Wrapper);
}

export default Authenticated;
