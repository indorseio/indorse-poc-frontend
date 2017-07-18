import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Layout from 'ui/auth/layout';
import Alert from 'ui/common/alert';
import TextField from 'ui/common/form/fields/text-field';
import validator from 'ui/common/form/validator';
import SubmitButton from 'ui/common/form/submit-button';

import fields, { fieldNames } from './model';
import * as messages from './messages';
import { forgotPassword } from 'store/auth/actions';
import { forgotPasswordEmailSent } from 'store/auth/selectors';

const validate = validator(fields);

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  onSubmit(values) {
    return this.props.forgotPassword.request(values, this.props.form);
  }

  render() {
    const { emailSent, handleSubmit, submitting, error, intl: { formatMessage } } = this.props;

    return (
      <Layout>
        {emailSent ?
          <Alert color="warning">
            {formatMessage(messages.alerts.emailSent)}
          </Alert> :
          <form onSubmit={handleSubmit(this.onSubmit)}>
            {error && <Alert color="danger" inverse>
              {error}
            </Alert>}
            <div>
              <Field name={fieldNames.email} component={TextField} label={formatMessage(messages.labels.email)} />
            </div>
            <div className="mt-3">
              <SubmitButton label={formatMessage(messages.buttons.submit)} primary fullWidth disabled={submitting} />
            </div>
          </form>}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    emailSent: forgotPasswordEmailSent(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: {
      request: bindActionCreators(forgotPassword.request, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'forgot-password',
  validate
})(injectIntl(ForgotPassword)));
