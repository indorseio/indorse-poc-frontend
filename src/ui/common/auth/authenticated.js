import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { defineMessages } from 'react-intl';

import { selectIsLoggedIn, selectIsCurrentUserApproved } from 'store/auth/selectors';
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
    loggedIn: selectIsLoggedIn(state),
    currentUserApproved: selectIsCurrentUserApproved(state)
  }
}

const approvalRequiredDefault = process.env.ADMIN_APPROVAL_REQUIRED_FOR_USER === 'true';

const Authenticated = (WrappedComponent, { approvalRequired = approvalRequiredDefault, flash = true } = {}) => {
  class Wrapper extends React.Component {
    render() {
      const { loggedIn, currentUserApproved, ...passThrough } = this.props;

      if (loggedIn) {
        if (approvalRequired && !currentUserApproved) {
          return <Redirect to={{
            pathname: routeTemplates.auth.approvalRequired,
            state: null
          }} />
        }
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
