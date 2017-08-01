import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchClaim } from 'store/entities/claims/actions';
import { selectClaimsById } from 'store/entities/claims/selectors';
import { selectCurrentUserId } from 'store/auth/selectors';

const { request: fetchClaimRequest } = fetchClaim;

class Details extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    claim: PropTypes.object
  }

  componentDidMount() {
    const { id, claim, fetchClaimRequest } = this.props;
    if (id && !claim) fetchClaimRequest({ claimId: id });
  }

  render() {
    const { claim } = this.props;

    // TODO: Replace with loading indicator icon
    if (!claim)
      return <h1 className="text-center mt-4">'Loading...'</h1>;

    return (
      <article className="container">
        <h1 className="mt-4">{claim.title}</h1>

        <div className="row">
          <div className="col-12">
            {claim.desc && <p>{claim.desc}</p>}
            {claim.proof && <dl>
              <dt>Proof:</dt>
              <dl>{claim.proof}</dl>
            </dl>}
          </div>
        </div>
      </article>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { match: { params: { id } } } = ownProps;

  return {
    id: id,
    claim: id ? selectClaimsById(state)[id] : undefined,
    currentUserId: selectCurrentUserId(state)
  }
}

const mapDispatchToProps = {
  fetchClaimRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
