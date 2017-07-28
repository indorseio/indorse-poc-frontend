import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { fetchUsers, approveUser, disapproveUser } from 'store/entities/users/actions';
import { allUsers as selectAllUsers } from 'store/entities/users/selectors';

import ApprovalStatusToggle  from './approval-status-toggle';

class Users extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount() {
    const { users, fetchUsers } = this.props;

    // TODO: Keep fetching/fetched state
    if (users.length === 0)
      fetchUsers.request();
  }

  renderUserRow(user) {
    return (
      <TableRow key={user.id}>
        <TableRowColumn>{user.name}</TableRowColumn>
        <TableRowColumn>{user.email}</TableRowColumn>
        <TableRowColumn>
          <ApprovalStatusToggle
            userId={user.id} approved={!!user.approved}
            onApprove={this.props.approveUser.request}
            onDisapprove={this.props.disapproveUser.request}
          />
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const { users, usersCount } = this.props;

    return (
      <div className="container">
        <h1 className="mt-4">
          <FormattedMessage
            id="admin.users.index.title"
            defaultMessage="Users {count}"
            values={{
              count: usersCount > 0 ? `(${usersCount})` : ''
            }} />
        </h1>

        <Table fixedHeader>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>E-mail</TableHeaderColumn>
              <TableHeaderColumn>Approval</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows displayRowCheckbox={false}>
            {users.map(user => this.renderUserRow(user))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  const users = selectAllUsers(state);

  return {
    users: users,
    usersCount: users ? users.length : 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: {
      request: bindActionCreators(fetchUsers.request, dispatch)
    },
    approveUser: {
      request: bindActionCreators(approveUser.request, dispatch)
    },
    disapproveUser: {
      request: bindActionCreators(disapproveUser.request, dispatch)
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Users));
