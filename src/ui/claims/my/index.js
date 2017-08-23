import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

import { selectCurrentUserId, selectCurrentUserClaimsFetched } from 'store/auth/selectors';
import { selectCurrentUserClaims } from 'store/entities/claims/selectors';
import { fetchUserClaims } from 'store/entities/claims/actions';

import ClaimsGrid from 'ui/claims/grid';
import Loading from 'ui/common/loading';
import Welcome from 'ui/claims/welcome';

const messages = defineMessages({
  title: {
    id: "dashboard.claims.title",
    defaultMessage: "My Claims"
  }
});

class Claims extends Component {
  static propTypes = {
    currentUserId: PropTypes.string,
    claims: PropTypes.array,
    fetchUserClaims: PropTypes.shape({
      request: PropTypes.func.isRequired
    }).isRequired
  }

  componentDidMount() {
    const { currentUserId, fetchUserClaims } = this.props;
    // TODO: Keep fetching/fetched state
    fetchUserClaims.request({ userId: currentUserId });
  }

  render() {
    const { claims, claimsFetched, intl: { formatMessage } } = this.props;

    if (!claimsFetched && claims.length === 0)
      return <Loading />;

    if (claimsFetched && claims.length === 0)
      return <Welcome />;

    return (
      <article className="container">
        <Helmet>
          <title>{formatMessage(messages.title)}</title>
        </Helmet>
        <header className="mt-4 d-flex align-items-center justify-content-center">
          <h1 className="text-primary">
            {formatMessage(messages.title)}
          </h1>
        </header>
        <main className="pt-5">
          {<ClaimsGrid claims={claims} showNewClaimLink minimumClaimCount={3} />}
        </main>
      </article>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserId: selectCurrentUserId(state),
    claims: selectCurrentUserClaims(state),
    claimsFetched: selectCurrentUserClaimsFetched(state)
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
