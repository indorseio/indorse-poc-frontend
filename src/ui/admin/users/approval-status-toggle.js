import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Toggle from 'material-ui/Toggle';

export class ApprovalStatusToggle extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    approved: PropTypes.bool.isRequired,
    onApprove: PropTypes.func.isRequired,
    onDisapprove: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    autoBind(this);
  }

  onToggle() {
    const { userId, approved, onApprove, onDisapprove } = this.props;

    approved ? onDisapprove({ userId }) : onApprove({ userId });
  }

  renderLabel() {
    const { approved } = this.props;

    if (approved)
      return <FormattedMessage id="admin.users.approval-status-toggle.approved" defaultMessage="Approved" />
    else
      return <FormattedMessage id="admin.users.approval-status-toggle.disapproved" defaultMessage="Disapproved" />
  }

  render() {
    const { approved } = this.props;

    return (
      <Toggle
        toggled={approved}
        onToggle={this.onToggle}
        label={this.renderLabel()}
        labelPosition="right" />
    );
  }
}

export default ApprovalStatusToggle;
