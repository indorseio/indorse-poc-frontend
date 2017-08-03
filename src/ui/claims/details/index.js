import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';

import routeTemplates from 'ui/common/routes/templates';
import themeConfig from 'ui/theme/config';
import { fetchClaim } from 'store/entities/claims/actions';
import { selectClaimById } from 'store/entities/claims/selectors';
import { selectCurrentUserId } from 'store/auth/selectors';
import { registerToVote, endorse, flag } from 'store/entities/votes/actions';
import messages from 'ui/claims/messages';
import votesMessages from 'ui/votes/messages';

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

  renderBreadcrumbs() {
    const { claim, currentUserId } = this.props;
    const { owner: claimant, vote } = claim;

    return (
      <ul className="breadcrumb my-3">
        {claimant && claimant.id === currentUserId && <li className="breadcrumb-item">
          <Link to={routeTemplates.claims.my}>My Claims</Link>
        </li>}
        {claimant && claimant.id !== currentUserId && vote && vote.voter && vote.voter.id === currentUserId && <li className="breadcrumb-item">
          <Link to={routeTemplates.votes.my}>My Votes</Link>
        </li>}
        <li className="breadcrumb-item active">{claim.title}</li>
      </ul>
    );
  }

  renderStatusBar() {
    const { claim, currentUserId, intl: { formatMessage } } = this.props;
    const { owner: claimant, votingRound, vote } = claim;

    if (claimant && claimant.id === currentUserId && votingRound) {
      if (moment().isBefore(moment(votingRound.endVoting))) {
        return (<Chip backgroundColor={themeConfig.palette.info} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.info}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">timer</FontIcon>} />
          {formatMessage(messages.pending)}
        </Chip>);
      } else if (claim.result) {
        const endorsed = claim.result === 'endorsed';
        const color = endorsed ? themeConfig.palette.success : themeConfig.color.danger;
        const icon = endorsed ? 'check circle' : 'close';
        const text = endorsed ? 'Endorsed' : 'Flagged';
        return (<Chip backgroundColor={color} labelColor="#ffffff">
          <Avatar backgroundColor={color} color="#ffffff" icon={<FontIcon className="material-icons">{icon}</FontIcon>} />
          {text}
        </Chip>);
      } else {
        return (<Chip backgroundColor={themeConfig.palette.warning} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.warning}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">warning</FontIcon>} />
          {formatMessage(messages.unverified)}
        </Chip>);
      }
    } else if (vote) {
      const { voter } = vote;
      if (voter.id === currentUserId) {
        if (!vote.registered && moment().isBefore(moment(votingRound.endRegistration))) {
          return (<Chip backgroundColor={themeConfig.palette.info} labelColor={themeConfig.palette.white}>
            <Avatar
              backgroundColor={themeConfig.palette.info}
              color={themeConfig.palette.white}
              icon={<FontIcon className="material-icons">timer</FontIcon>} />
            <FormattedMessage
              {...votesMessages.registrationTimeRemaining}
              values={{
                relativeTime: moment(votingRound.endRegistration).fromNow(true)
              }} />
          </Chip>);
        } else if (moment().isBefore(moment(votingRound.endVoting))) {
          return (<Chip backgroundColor={themeConfig.palette.info} labelColor={themeConfig.palette.white}>
            <Avatar
              backgroundColor={themeConfig.palette.info}
              color={themeConfig.palette.white}
              icon={<FontIcon className="material-icons">timer</FontIcon>} />
            <FormattedMessage
              {...votesMessages.votingTimeRemaining}
              values={{
                relativeTime: moment(votingRound.endVoting).fromNow(true)
              }} />
          </Chip>);
        } else if (claim.result) {
          const endorsed = claim.result === 'endorsed';
          const color = endorsed ? themeConfig.palette.success : themeConfig.color.danger;
          const icon = endorsed ? 'check circle' : 'close';
          const text = endorsed ? 'Endorsed' : 'Flagged';
          return (<Chip backgroundColor={color} labelColor="#ffffff">
            <Avatar backgroundColor={color} color="#ffffff" icon={<FontIcon className="material-icons">{icon}</FontIcon>} />
            {text}
          </Chip>);
        }
      }
    }

    return null;
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
    const { intl: { formatMessage } } = this.props;

    if (!vote || !votingRound)
      return null;

    if (!vote.registered && moment().isBefore(moment(votingRound.endRegistration))) {
      return (
        <ul className="list list-inline">
          <li><RaisedButton label={formatMessage(votesMessages.register)} primary onClick={this.onRegisterToVoteClick} /></li>
        </ul>
      );
    }

    if (vote.registered) {
      if (vote.votedAt) {
        return <ul className="list list-inline">
          <li>{
            vote.endorsed ?
              <RaisedButton
                label={formatMessage(votesMessages.endorsed)}
                backgroundColor={themeConfig.palette.success}
                labelColor={themeConfig.palette.white} /> :
              <RaisedButton
                label={formatMessage(votesMessages.flagged)}
                backgroundColor={themeConfig.palette.danger}
                labelColor={themeConfig.palette.white} />}
          </li>
        </ul>
      } else if (moment().isBefore(moment(votingRound.endVoting))) {
        return (
          <ul className="list list-inline">
            <li className="list-inline-item">
              <RaisedButton
                label={formatMessage(votesMessages.endorse)}
                backgroundColor={themeConfig.palette.success}
                labelColor={themeConfig.palette.white}
                onClick={this.onEndorseClick} />
            </li>
            <li className="list-inline-item">
              <RaisedButton
                label={formatMessage(votesMessages.flag)}
                backgroundColor={themeConfig.palette.danger}
                labelColor={themeConfig.palette.white}
                onClick={this.onFlagClick} />
            </li>
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
        <div className="row">
          <div className="col-12">
            {this.renderBreadcrumbs()}
            <h1 className="text-primary mt-4">{claim.title}</h1>
            <div className="my-3">
              {this.renderStatusBar()}
            </div>
            {claim.desc && <p className="lead">{claim.desc}</p>}
            {claim.proof && <dl>
              <dt>Proof:</dt>
              <dl className="lead">{claim.proof}</dl>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Details));
