import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

import { fetchClaim } from 'store/entities/claims/actions';
import { selectClaimById } from 'store/entities/claims/selectors';
import { selectCurrentUserId } from 'store/auth/selectors';
import { registerToVote, endorse, flag } from 'store/entities/votes/actions';

const { request: fetchClaimRequest } = fetchClaim;
const { request: registerToVoteRequest } = registerToVote;
const { request: endorseRequest } = endorse;
const { request: flagRequest } = flag;

class Details extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    claim: PropTypes.object
  }

  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount() {
    const { id, claim, fetchClaimRequest } = this.props;
    if (id && !claim) fetchClaimRequest({ claimId: id });
  }

  onRegisterToVoteClick() {
    const { claim: { vote }, registerToVoteRequest } = this.props;

    registerToVoteRequest({ voteId: vote.id });
  }

  onEndorseClick() {
    const { claim: { vote }, endorseRequest } = this.props;

    endorseRequest({ voteId: vote.id });
  }

  onFlagClick() {
    const { claim: { vote }, flagRequest } = this.props;

    flagRequest({ voteId: vote.id });
  }

  renderVoteActions() {
    const { claim } = this.props;
    const { votingRound, vote } = claim;

    if (!vote || !votingRound)
      return null;

    if (!vote.registered && moment().isBefore(moment(votingRound.endRegistration))) {
      return (
        <ul className="list list-inline">
          <li><RaisedButton label="Register" primary onClick={this.onRegisterToVoteClick} /></li>
        </ul>
      );
    }

    if (vote.registered) {
      if (vote.votedAt) {
        return <ul className="list list-inline">
          <li>{
            vote.endorsed ?
              <RaisedButton label="Endorsed" primary /> :
              <RaisedButton label="Flagged" primary />}
          </li>
        </ul>
      } else if (moment().isBefore(moment(votingRound.endVoting))) {
        return (
          <ul className="list list-inline">
            <li className="list-inline-item"><RaisedButton label="Endorse" primary onClick={this.onEndorseClick} /></li>
            <li className="list-inline-item"><RaisedButton label="Flag" primary onClick={this.onFlagClick} /></li>
          </ul>
        );
      } else {
        return (<ul className="list list-inline">
          <li>Deadline missed</li>
        </ul>)
      }
    }
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
            {claim.vote && this.renderVoteActions()}
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
    claim: id ? selectClaimById(state, { id }) : undefined,
    currentUserId: selectCurrentUserId(state)
  }
}

const mapDispatchToProps = {
  fetchClaimRequest,
  registerToVoteRequest,
  endorseRequest,
  flagRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
