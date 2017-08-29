import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import ExternalLink from 'ui/common/external-link';

import routeTemplates from 'ui/common/routes/templates';
import themeConfig from 'ui/theme/config';
import messages from 'ui/votes/messages';
import claimMessages from 'ui/claims/messages';
import { STATUSES as CLAIM_STATUSES } from 'store/entities/claims/helpers';
import { STATUSES as VOTE_STATUSES } from 'store/entities/votes/helpers';

class VotesTable extends Component {
  static propTypes = {
    votes: PropTypes.array
  }

  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderResult(vote) {
    const { claim } = vote;
    const { intl: { formatMessage } } = this.props;

    if (!claim)
      return null;

    switch (claim.status) {
      case CLAIM_STATUSES.registration:
      case CLAIM_STATUSES.voting:
        return (<Chip backgroundColor={themeConfig.palette.info} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.info}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">timer</FontIcon>} />
          {formatMessage(claimMessages.pending)}
        </Chip>);
      case CLAIM_STATUSES.endorsed:
        return (<Chip backgroundColor={themeConfig.palette.success} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.success}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">check circle</FontIcon>}
          />
          {formatMessage(claimMessages.endorsed)}
        </Chip>);
      case CLAIM_STATUSES.flagged:
        return (<Chip backgroundColor={themeConfig.palette.danger} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.danger}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">close</FontIcon>}
          />
          {formatMessage(claimMessages.flagged)}
        </Chip>);
      case CLAIM_STATUSES.unverified:
        return (<Chip backgroundColor={themeConfig.palette.warning} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.warning}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">warning</FontIcon>} />
          {formatMessage(claimMessages.unverified)}
        </Chip>);
      default:
        return null;
    }
  }

  renderVoteStatus(vote) {
    const { intl: { formatMessage } } = this.props;

    switch (vote.status) {
      case VOTE_STATUSES.pending_registration:
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
          {formatMessage(messages.registered)}
        </Chip>;
      case VOTE_STATUSES.endorsed:
        return <Chip
          backgroundColor={themeConfig.palette.success}
          labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.success}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">check circle</FontIcon>} />
          {formatMessage(messages.endorsed)}
        </Chip>;
      case VOTE_STATUSES.flagged:
        return <Chip
          backgroundColor={themeConfig.palette.danger}
          labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.danger}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">close</FontIcon>} />
          {formatMessage(messages.flagged)}
        </Chip>
      default:
        return null;
    }
  }


  render() {
    const { votes } = this.props;

    return (
      <Table className="my-3">
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>
              <FormattedMessage id="vote.title" defaultMessage="Title" />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage id="vote.proof" defaultMessage="Proof" />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage id="vote.claim.result" defaultMessage="Result" />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage id="vote.your" defaultMessage="Your Vote" />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
          {votes.map(vote => (
            <TableRow key={vote.id}>
              <TableRowColumn>
                <Link to={routeTemplates.claims.details.replace(':id', vote.claim.id)} className="lead">{vote.claim.title}</Link>
              </TableRowColumn>
              <TableRowColumn>
                <div className="lead">
                  <ExternalLink href={vote.claim.proof} openInNewTab />
                </div>
              </TableRowColumn>
              <TableRowColumn>
                {this.renderResult(vote)}
              </TableRowColumn>
              <TableRowColumn>
                {this.renderVoteStatus(vote)}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default injectIntl(VotesTable);
