import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

class Admin extends Component {
  render() {
    return (
      <div className="container">
        <header className="text-center my-4">
          <FormattedMessage id="admin.title" defaultMessage="Admin" tagName="h1" />
        </header>
      </div>
    );
  }
}

export default injectIntl(Admin);
