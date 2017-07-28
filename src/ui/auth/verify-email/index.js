import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Layout from 'ui/auth/layout';
import Alert from 'ui/common/alert';

import { verifyEmail } from 'store/auth/actions';
import { emailVerification } from 'store/auth/selectors';

class VerifyEmail extends Component {
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let email = query.get('email');
    if (email) email = email.replace(' ', '+');
    const verifyToken = query.get('token');

    this.props.verifyEmail.request({ email, verifyToken });
  }

  render() {
    const { verifying, verified, error } = this.props;

    return (
      <Layout showFooter={false}>
        {verifying && <Alert color="info">
          <FormattedMessage id="auth.verify-email.verifying" defaultMessage="Verifying your email..." />
        </Alert>}
        {verified && <Alert color="success">
          <FormattedMessage id="auth.verify-email.verified" defaultMessage="Thank you for verifying your email. Please login to continue" />
        </Alert>}
        {error && <Alert color="danger">
          <FormattedMessage id="auth.verify-email.error" defaultMessage="There was " />
          {error}
        </Alert>}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { ...emailVerification(state) };
}

function mapDispatchToProps(dispatch) {
  return {
    verifyEmail: {
      request: bindActionCreators(verifyEmail.request, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
