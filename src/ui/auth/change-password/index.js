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
import { changePassword } from 'store/auth/actions';

const validate = validator(fields);

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  onSubmit(values) {
    return this.props.changePassword.request(values, this.props.form);
  }

  render() {
    const { handleSubmit, submitting, error, intl: { formatMessage } } = this.props;

    return (
      <Layout standalone={false}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {error && <Alert color="danger">
            {error}
          </Alert>}
          <div>
            <Field name={fieldNames.oldPassword} component={TextField} type="password" label={formatMessage(messages.labels.oldPassword)} />
          </div>
          <div>
            <Field name={fieldNames.newPassword} component={TextField} type="password" label={formatMessage(messages.labels.newPassword)} />
          </div>
          <div>
            <Field name={fieldNames.newPasswordConfirmation} component={TextField} type="password" label={formatMessage(messages.labels.newPasswordConfirmation)} />
          </div>
          <div className="mt-3">
            <SubmitButton label={formatMessage(messages.buttons.submit)} primary fullWidth disabled={submitting} />
          </div>
        </form>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePassword: {
      request: bindActionCreators(changePassword.request, dispatch)
    }
  }
}

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'change-pasword',
  validate
})(injectIntl(ChangePassword)));
