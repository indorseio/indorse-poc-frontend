import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import Layout from 'ui/auth/layout';
import Alert from 'ui/common/alert';
import TextField from 'ui/common/form/fields/text-field';
import validator from 'ui/common/form/validator';
import SubmitButton from 'ui/common/form/submit-button';

import brand from 'resources/brand';
import fields, { fieldNames } from './model';
import * as messages from './messages';
import { login } from 'store/auth/actions';
import routeTemplates from 'ui/common/routes/templates';

const validate = validator(fields);

class Login extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  onSubmit(values) {
    return this.props.login.request(values, this.props.form);
  }

  renderFooter() {
    const { intl: { formatMessage } } = this.props;

    return <FormattedMessage {...messages.links.signUpPrompt} values={{
      brand: brand.name,
      link: <Link to={routeTemplates.auth.signUp}>{formatMessage(messages.links.signUp)}</Link>
    }} />;
  }

  render() {
    const { handleSubmit, submitting, error, intl: { formatMessage } } = this.props;

    return (
      <Layout title={formatMessage(messages.header.title)} footerContent={this.renderFooter()}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {error && <Alert color="danger" inverse>
            {error}
          </Alert>}
          <div>
            <Field name={fieldNames.email} component={TextField} label={formatMessage(messages.labels.email)} />
          </div>
          <div>
            <Field name={fieldNames.password} component={TextField} type="password" label={formatMessage(messages.labels.password)} />
          </div>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <Link to={routeTemplates.auth.forgotPassword}>
              {formatMessage(messages.links.forgotPassword)}
            </Link>
            <SubmitButton label={formatMessage(messages.buttons.submit)} primary disabled={submitting} />
          </div>
        </form>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: {
      request: bindActionCreators(login.request, dispatch)
    }
  }
}

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'login',
  validate
})(injectIntl(Login)));
