import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { confirm, cancel } from 'store/confirmation-dialog/actions';
import { selectIsOpen, selectMessage } from 'store/confirmation-dialog/selectors';

const messages = defineMessages({
  title: {
    id: "confirmation-dialog.title",
    defaultMessage: "Confirm"
  },
  confirm: {
    id: "confirmation-dialog.confirm",
    defaultMessage: "Confirm"
  },
  cancel: {
    id: "confirmation-dialog.cancel",
    defaultMessage: "Cancel"
  },
})

class ConfirmationDialog extends Component {
  getDialogActions() {
    const { intl: { formatMessage }, confirm, cancel } = this.props;

    return [
      <FlatButton
        label={formatMessage(messages.cancel)}
        onTouchTap={cancel} />,
      <FlatButton
        label={formatMessage(messages.confirm)}
        primary
        onTouchTap={confirm} />,
    ];
  }

  renderMessage(message) {
    if (typeof message === 'object' && message.hasOwnProperty('id') && message.hasOwnProperty('defaultMessage'))
      return <FormattedMessage {...message} />;

    return message;
  }

  render() {
    const { isOpen, message, intl: { formatMessage } } = this.props;
    const dialogActions = this.getDialogActions();

    return (<Dialog
      title={formatMessage(messages.title)}
      actions={dialogActions}
      modal
      open={isOpen}
    >
      {this.renderMessage(message)}
    </Dialog>);
  }
}

function mapStateToProps(state) {
  return {
    isOpen: selectIsOpen(state),
    message: selectMessage(state),
  }
}

const mapDispatchToProps = {
  confirm, cancel
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ConfirmationDialog));
