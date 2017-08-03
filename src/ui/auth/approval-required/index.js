import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectIsSignedUp, selectIsCurrentUserApproved } from 'store/auth/selectors';
import routeTemplates from 'ui/common/routes/templates';
import Layout from 'ui/auth/layout';
import Alert from 'ui/common/alert';

class ApprovalRequired extends Component {
  render() {
    const { signedUp, currentUserApproved } = this.props;

    if (currentUserApproved) {
      return <Redirect to={routeTemplates.root} />
    }

    return (
      <Layout title={<FormattedMessage id="auth.approval-required.title" defaultMessage="Approval required" />} showFooter={false}>
        {signedUp && <Alert color="success" inverse>
          <FormattedMessage
            id="auth.approval-required.signed-up"
            defaultMessage="Thank you for signing up" />
        </Alert>}
        <Alert color="warning">
          <FormattedMessage
            id="auth.approval-required.instructions"
            defaultMessage="Your account has not been approved by your administrator yet. You will receive an email when admin approves you account" />
        </Alert>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    signedUp: selectIsSignedUp(state),
    currentUserApproved: selectIsCurrentUserApproved(state)
  }
}

export default connect(mapStateToProps)(injectIntl(ApprovalRequired));
