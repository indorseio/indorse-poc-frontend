import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import { selectCurrentUserId } from 'store/auth/selectors';
import { selectCurrentUserClaims } from 'store/entities/claims/selectors';
import { fetchUserClaims } from 'store/entities/claims/actions';

import ClaimsTable from 'ui/claims/table';
import routeTemplates from 'ui/common/routes/templates';

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
    return (
      <article className="container">
        <header className="mt-4 d-flex align-items-center justify-content-between">
          <h1 className="text-primary">
            <FormattedMessage id="dashboard.claims.title" defaultMessage="My Claims" />
          </h1>
          <Link to={routeTemplates.claims.new}>
            <RaisedButton
              primary
              label={<FormattedMessage id="dashboard.claims.links.new" defaultMessage="New Claim" />} />
          </Link>
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
    currentUserId: selectCurrentUserId(state),
    claims: selectCurrentUserClaims(state)
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
