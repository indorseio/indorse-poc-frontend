import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import { Helmet } from "react-helmet";
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
import { STATUSES as CLAIM_STATUSES } from 'store/entities/claims/helpers';
import { STATUSES as VOTE_STATUSES } from 'store/entities/votes/helpers';
import Loading from 'ui/common/loading';
import ExternalLink from 'ui/common/external-link';

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
    const { claim, intl: { formatMessage } } = this.props;
    const { votingRound } = claim;

    if (claim.status) {
      switch (claim.status) {
        case CLAIM_STATUSES.registration:
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
        case CLAIM_STATUSES.voting:
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
        case CLAIM_STATUSES.endorsed:
          return (<Chip backgroundColor={themeConfig.palette.success} labelColor={themeConfig.palette.white}>
            <Avatar
              backgroundColor={themeConfig.palette.success}
              color={themeConfig.palette.white}
              icon={<FontIcon className="material-icons">check circle</FontIcon>}
            />
            {formatMessage(messages.endorsed)}
          </Chip>);
        case CLAIM_STATUSES.flagged:
          return (<Chip backgroundColor={themeConfig.palette.danger} labelColor={themeConfig.palette.white}>
            <Avatar
              backgroundColor={themeConfig.palette.danger}
              color={themeConfig.palette.white}
              icon={<FontIcon className="material-icons">close</FontIcon>}
            />
            {formatMessage(messages.flagged)}
          </Chip>);
        case CLAIM_STATUSES.unverified:
          return (<Chip backgroundColor={themeConfig.palette.warning} labelColor={themeConfig.palette.white}>
            <Avatar
              backgroundColor={themeConfig.palette.warning}
              color={themeConfig.palette.white}
              icon={<FontIcon className="material-icons">warning</FontIcon>} />
            {formatMessage(messages.unverified)}
          </Chip>);
        default:
          return null;
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
    const { claim, currentUserId } = this.props;
    const { owner: claimant, votingRound, vote } = claim;
    const { intl: { formatMessage } } = this.props;

    if (!vote || !vote.status || !votingRound || !claim || (claimant && claimant.id === currentUserId))
      return null;

    const { voter } = vote;
    if (voter.id !== currentUserId)
      return null;

    switch (vote.status) {
      case VOTE_STATUSES.pending_registration:
        return (
          <ul className="list list-inline">
            <li><RaisedButton label={formatMessage(votesMessages.register)} primary onClick={this.onRegisterToVoteClick} /></li>
          </ul>
        );
      case VOTE_STATUSES.registration_missed:
        return null;
      case VOTE_STATUSES.registered:
        return <Chip
          backgroundColor={themeConfig.palette.primary}
          labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.primary}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">check circle</FontIcon>} />
          {formatMessage(votesMessages.registered)}
        </Chip>;
      case VOTE_STATUSES.pending_vote:
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
      case VOTE_STATUSES.endorsed:
        return (<dl>
          <dt className="my-2">{formatMessage(votesMessages.yourVote)}</dt>
          <dl>
            <Chip
              backgroundColor={themeConfig.palette.success}
              labelColor={themeConfig.palette.white}>
              <Avatar
                backgroundColor={themeConfig.palette.success}
                color={themeConfig.palette.white}
                icon={<FontIcon className="material-icons">check circle</FontIcon>} />
              {formatMessage(messages.endorsed)}
            </Chip>
          </dl>
        </dl>);
      case VOTE_STATUSES.flagged:
        return (<dl className="my-2">
          <dt>{formatMessage(votesMessages.yourVote)}</dt>
          <dl><Chip
            backgroundColor={themeConfig.palette.danger}
            labelColor={themeConfig.palette.white}>
            <Avatar
              backgroundColor={themeConfig.palette.danger}
              color={themeConfig.palette.white}
              icon={<FontIcon className="material-icons">close</FontIcon>} />
            {formatMessage(messages.flagged)}
          </Chip></dl>
        </dl>);
      default:
        return null;
    }
  }

  render() {
    const { claim } = this.props;

    if (!claim)
      return <Loading />;

    return (
      <article className="container">
        <Helmet>
          <title>{claim.title}</title>
        </Helmet>
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
              <dl className="lead">
                <ExternalLink href={claim.proof} openInNewTab />
              </dl>
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
