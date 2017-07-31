import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { defineMessages } from 'react-intl';

import { selectIsLoggedIn } from 'store/auth/selectors';
import routeTemplates from 'ui/common/routes/templates';
import { buildMessage } from 'store/flash/builder';

const messages = defineMessages({
  alreadyAuthenticated: {
    id: 'common.auth.anonymous-only.authenticated',
    defaultMessage: 'You are already logged in'
  }
});

function mapStateToProps(state) {
  return {
    loggedIn: selectIsLoggedIn(state)
  }
}

const AnonymousOnly = (WrappedComponent, { flash = true } = {}) => {
  class Wrapper extends React.Component {
    render() {
      const { loggedIn, ...passThrough } = this.props;

      if (!loggedIn) {
        return <WrappedComponent {...passThrough} />;
      }
      else {
        return <Redirect to={{
          pathname: routeTemplates.root,
          state: flash ? {
            flash: buildMessage({
              id: 'already-authenticated',
              kind: 'danger',
              content: messages.alreadyAuthenticated
            })
          } : undefined
        }} />
      }
    }
  }

  Wrapper.displayName = 'AnonymousOnly';

  return connect(mapStateToProps)(Wrapper);
}

export default AnonymousOnly;
