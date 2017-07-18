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
import { resetPassword } from 'store/auth/actions';

const validate = validator(fields);

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  onSubmit(values) {
    return this.props.resetPassword.request(values, this.props.form);
  }

  render() {
    const { handleSubmit, submitting, error, intl: { formatMessage } } = this.props;

    return (
      <Layout>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {error && <Alert color="danger">
            {error}
          </Alert>}
          <div>
            <Field name={fieldNames.password} component={TextField} type="password" label={formatMessage(messages.labels.password)} />
          </div>
          <div>
            <Field name={fieldNames.passwordConfirmation} component={TextField} type="password" label={formatMessage(messages.labels.passwordConfirmation)} />
          </div>
          <div className="mt-3">
            <SubmitButton label={formatMessage(messages.buttons.submit)} primary fullWidth disabled={submitting} />
          </div>
        </form>
      </Layout>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const query = new URLSearchParams(ownProps.location.search);
  let email = query.get('email');
  if (email) email = email.replace(' ', '+');
  const passwordToken = query.get('pass_token');

  return {
    initialValues: { email, passwordToken }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: {
      request: bindActionCreators(resetPassword.request, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'reset-pasword',
  validate
})(injectIntl(ResetPassword)));
