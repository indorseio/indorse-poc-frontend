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
import moment from 'moment';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';

import routeTemplates from 'ui/common/routes/templates';
import themeConfig from 'ui/theme/config';
import votesMessages from 'ui/votes/messages';
import claimMessages from 'ui/claims/messages';

class VotesTable extends Component {
  static propTypes = {
    votes: PropTypes.array
  }

  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderResult(vote) {
    const { votingRound, claim } = vote;
    const { intl: { formatMessage } } = this.props;

    if (moment().isBefore(moment(votingRound.endVoting))) {
      return (<Chip backgroundColor={themeConfig.palette.info} labelColor={themeConfig.palette.white}>
        <Avatar
          backgroundColor={themeConfig.palette.info}
          color={themeConfig.palette.white}
          icon={<FontIcon className="material-icons">timer</FontIcon>} />
        {formatMessage(claimMessages.pending)}
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
        {formatMessage(claimMessages.unverified)}
      </Chip>);
    }
  }

  renderVoteStatus(vote) {
    const { intl: { formatMessage } } = this.props;

    if (vote.registered) {
      if (vote.votedAt) {
        return vote.endorsed ?
          <Chip
            backgroundColor={themeConfig.palette.success}
            labelColor={themeConfig.palette.white}>
            <Avatar
              backgroundColor={themeConfig.palette.success}
              color={themeConfig.palette.white}
              icon={<FontIcon className="material-icons">check circle</FontIcon>} />
            {formatMessage(votesMessages.endorsed)}
          </Chip> :
          <Chip
            backgroundColor={themeConfig.palette.danger}
            labelColor={themeConfig.palette.white}>
            <Avatar
              backgroundColor={themeConfig.palette.danger}
              color={themeConfig.palette.white}
              icon={<FontIcon className="material-icons">close</FontIcon>} />
            {formatMessage(votesMessages.flagged)}
          </Chip>
      }
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
                <div className="lead">{vote.claim.proof}</div>
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
