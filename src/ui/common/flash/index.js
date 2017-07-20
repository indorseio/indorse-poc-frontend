import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { FormattedMessage } from 'react-intl';

import { allMessages } from 'store/flash/selectors';
import { removeMessage } from 'store/flash/actions';
import Alert from 'ui/common/alert';

class Flash extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
    inverseColor: PropTypes.bool
  }

  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderMessageContent(content) {
    if (typeof content === 'object' && content.hasOwnProperty('id') && content.hasOwnProperty('defaultMessage'))
      return <FormattedMessage {...content} />;

    return content;
  }

  renderMessage(message) {
    const { inverseColor, removeMessage } = this.props;

    return (
      <Alert
        key={message.id}
        color={message.kind}
        inverse={inverseColor}
        toggle={message.dismissable ? () => removeMessage(message.id) : null}
      >
        {this.renderMessageContent(message.content)}
      </Alert>
    );
  }

  render() {
    const { messages, className } = this.props;

    if (!messages || messages.length === 0)
      return null;

    return (
      <div className={className}>
        {messages.map((message, index) => this.renderMessage(message))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: allMessages(state)
  }
};

const mapDispatchToProps = { removeMessage };

export default connect(mapStateToProps, mapDispatchToProps)(Flash);
