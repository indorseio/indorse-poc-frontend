import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { currentUserId } from 'store/auth/selectors';
import { currentUserClaims } from 'store/entities/claims/selectors';
import { fetchUserClaims } from 'store/entities/claims/actions';

import ClaimsTable from 'ui/claims/table';

class Claims extends Component {
  static propTypes = {
    currentUserId: PropTypes.string,
    claims: PropTypes.array,
    fetchUserClaims: PropTypes.shape({
      request: PropTypes.func.isRequired
    }).isRequired
  }

  componentDidMount() {
    const { claims, currentUserId, fetchUserClaims } = this.props;
    // TODO: Keep fetching/fetched state
    if (claims.length === 0)
      fetchUserClaims.request({ userId: currentUserId });
  }

  render() {
    return (
      <article className="container">
        <header className="text-center mt-4">
          <FormattedMessage id="dashboard.claims.title" defaultMessage="My Claims" tagName="h1" />
        </header>
        <main>
          <ClaimsTable claims={this.props.claims} />
        </main>
      </article>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserId: currentUserId(state),
    claims: currentUserClaims(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserClaims: {
      request: bindActionCreators(fetchUserClaims.request, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Claims));
