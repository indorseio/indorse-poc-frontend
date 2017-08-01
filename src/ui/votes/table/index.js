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

import routeTemplates from 'ui/common/routes/templates';

class VotesTable extends Component {
  static propTypes = {
    votes: PropTypes.array
  }

  render() {
    const { votes } = this.props;

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default injectIntl(VotesTable);
