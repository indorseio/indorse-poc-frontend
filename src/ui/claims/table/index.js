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

class ClaimsTable extends Component {
  static propTypes = {
    claims: PropTypes.array
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
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
          {claims.map(claim => (
            <TableRow key={claim.id}>
              <TableRowColumn>
                <div className="lead">{claim.title}</div>
              </TableRowColumn>
              <TableRowColumn>
                <div className="lead">{claim.proof}</div>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default injectIntl(ClaimsTable);
