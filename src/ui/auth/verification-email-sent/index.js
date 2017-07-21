import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { signedUp } from 'store/auth/selectors';

import Layout from 'ui/auth/layout';
import Alert from 'ui/common/alert';

class VerificationEmailSent extends Component {
  render() {
    const { signedUp } = this.props;

    return (
      <Layout title={<FormattedMessage id="auth.verification-email-sent.title" defaultMessage="Verify you email" />} showFooter={false}>
        {signedUp && <Alert color="success" inverse>
          <FormattedMessage
            id="auth.verification-email-sent.signed-up"
            defaultMessage="Thank you for signing up" />
        </Alert>}
        <Alert color="warning">
          <FormattedMessage
            id="auth.verification-email-sent.instructions"
            defaultMessage="A message with a verification link has been sent to your email address. Please follow the link to verify your email." />
        </Alert>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    signedUp: signedUp(state)
  }
}

export default connect(mapStateToProps)(injectIntl(VerificationEmailSent));
