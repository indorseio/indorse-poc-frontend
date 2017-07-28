import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';

import styles from './index.module.scss';
import Header from './header';
import Flash from 'ui/common/flash';

class Layout extends Component {
  static propTypes = {
    intl: intlShape
  }

  render() {
    return (
      <div className={styles.layout}>
        <Header className={styles.header} />
        <div className={styles.content}>
          <Flash className="container mt-3" />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default injectIntl(Layout);
