import React, { Component } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Helmet } from "react-helmet";
import Alert from 'ui/common/alert';
import TextField from 'ui/common/form/fields/text-field';
import SelectField from 'ui/common/form/fields/select-field';
import MenuItem from 'material-ui/MenuItem';
import validator from 'ui/common/form/validator';
import SubmitButton from 'ui/common/form/submit-button';

import fields, { fieldNames, skills } from './model';
import * as messages from './messages';
import { createClaim } from 'store/entities/claims/actions';
import styles from './index.module.scss';

import { ensureScheme } from 'utils/url';

const validate = validator(fields);

class NewClaim extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  onSubmit(values) {
    const proof = ensureScheme(values[fieldNames.proof], fields[fieldNames.proof].url.defaultScheme);
    return this.props.createClaim.request({ ...values, proof }, this.props.form);
  }

  render() {
    const { handleSubmit, submitting, error, intl: { formatMessage } } = this.props;

    return (
      <div className={classnames('container', styles.page)}>
        <Helmet>
          <title>{formatMessage(messages.header.title)}</title>
        </Helmet>
        <div className={classnames('row justify-content-center align-items-center', styles.pageRow)}>
          <div className="col-12 col-sm-6">
            <h1 className="text-primary text-center">
              {formatMessage(messages.header.title)}
            </h1>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              {error && <Alert color="danger" inverse>
                {error}
              </Alert>}
              <div>
                <Field
                  name={fieldNames.title}
                  component={SelectField}
                  label={formatMessage(messages.labels.title)}
                  hint={formatMessage(messages.hints.title)}>
                  {skills.map(skill => <MenuItem key={skill} value={skill} primaryText={skill} />)}
                </Field>
              </div>
              <div>
                <Field name={fieldNames.description} component={TextField} label={formatMessage(messages.labels.description)} multiLine rows={2} rowsMax={10} />
              </div>
              <div>
                <Field name={fieldNames.proof} component={TextField} label={formatMessage(messages.labels.proof)} hint={formatMessage(messages.hints.proof)} />
              </div>
              <div className="mt-3">
                <SubmitButton label={formatMessage(messages.buttons.submit)} primary fullWidth disabled={submitting} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createClaim: {
      request: bindActionCreators(createClaim.request, dispatch)
    }
  }
}

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'new-claim',
  validate
})(injectIntl(NewClaim)));
