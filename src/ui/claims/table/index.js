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
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import autoBind from 'react-autobind';

import routeTemplates from 'ui/common/routes/templates';
import themeConfig from 'ui/theme/config';
import { STATUSES as CLAIM_STATUSES } from 'store/entities/claims/helpers';
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

    switch (claim.status) {
      case CLAIM_STATUSES.registration:
      return (<Chip backgroundColor={themeConfig.palette.info} labelColor={themeConfig.palette.white}>
        <Avatar
          backgroundColor={themeConfig.palette.info}
          color={themeConfig.palette.white}
          icon={<FontIcon className="material-icons">timer</FontIcon>} />
        {formatMessage(messages.registration)}
      </Chip>);
      case CLAIM_STATUSES.voting:
        return (<Chip backgroundColor={themeConfig.palette.info} labelColor={themeConfig.palette.white}>
          <Avatar
            backgroundColor={themeConfig.palette.info}
            color={themeConfig.palette.white}
            icon={<FontIcon className="material-icons">timer</FontIcon>} />
          {formatMessage(messages.voting)}
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
