import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { defineMessages } from 'react-intl';
import { } from 'humps';

import { selectCurrentUserRole } from 'store/auth/selectors';
import routeTemplates from 'ui/common/routes/templates';
import { buildMessage } from 'store/flash/builder';
import Authenticated from './authenticated';

const messages = defineMessages({
  roleRequired: {
    id: 'common.auth.allowed-role.required',
    defaultMessage: 'Only {roles} can access this content'
  }
});

function mapStateToProps(state) {
  return {
    role: selectCurrentUserRole(state)
  }
}

const AllowedRoles = (WrappedComponent, { roles, flash = true } = {}) => {
  class Wrapper extends React.Component {
    render() {
      const { role, ...passThrough } = this.props;

      if (!roles || roles.length === 0 || roles.indexOf(role) >= 0) {
        return <WrappedComponent {...passThrough} />;
      }
      else {
        return <Redirect to={{
          pathname: routeTemplates.auth.login,
          state: flash ? {
            flash: buildMessage({
              id: 'must-be-in-role',
              kind: 'danger',
              content: {
                ...messages.roleRequired,
                values: {
                  roles: (roles || []).join(',')
                }
              },
            })
          } : undefined
        }} />
      }
    }
  }

  Wrapper.displayName = 'AllowedRoles';

  return Authenticated(connect(mapStateToProps)(Wrapper));
}

export default AllowedRoles;
