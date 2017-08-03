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
import moment from 'moment';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import autoBind from 'react-autobind';

import routeTemplates from 'ui/common/routes/templates';
import themeConfig from 'ui/theme/config';
import messages from 'ui/claims/messages';

class ClaimsTable extends Component {
  static propTypes = {
    claims: PropTypes.array
  }

  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderStatus(claim) {
    const { intl: { formatMessage } } = this.props;
    const { votingRound } = claim;

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
  }

  render() {
    const { claims } = this.props;

    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>
              <FormattedMessage id="claim.title" defaultMessage="Title" />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage id="claim.proof" defaultMessage="Proof" />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage id="claim.status" defaultMessage="Status" />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
          {claims.map(claim => (
            <TableRow key={claim.id}>
              <TableRowColumn>
                <Link to={routeTemplates.claims.details.replace(':id', claim.id)} className="lead">{claim.title}</Link>
              </TableRowColumn>
              <TableRowColumn>
                <div className="lead">{claim.proof}</div>
              </TableRowColumn>
              <TableRowColumn>
                {this.renderStatus(claim)}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default injectIntl(ClaimsTable);
