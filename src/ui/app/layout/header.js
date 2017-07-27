import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { UncontrolledNavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import classnames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import brand from 'resources/brand';
import { selectIsLoggedIn, selectCurrentUser, selectIsCurrentUserAdmin } from 'store/auth/selectors';
import { logout } from 'store/auth/actions';
import routeTemplates from 'ui/common/routes/templates';

class Header extends Component {
  static propTypes = {
    intl: intlShape
  }

  constructor(props) {
    super(props);

    autobind(this);

    this.navbar = null;
    this.state = {
      isOpen: false
    };
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  collapseNavbar() {
    this.setState({
      isOpen: false
    });
  }

  renderAnonymousNav() {
    return (
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav navbar className="ml-auto">
          <NavItem>
            <NavLink tag={Link} to={routeTemplates.auth.login}>
              <FormattedMessage id="app.layout.header.login" defaultMessage="Login" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={routeTemplates.auth.signUp}>
              <FormattedMessage id="app.layout.header.sign-up" defaultMessage="Sign Up" />
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    );
  }

  renderUserNav() {
    const { currentUser, currentUserIsAdmin } = this.props;

    return (
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav navbar className="mr-auto">
          <NavItem>
            {currentUserIsAdmin && <NavLink tag={Link} to={routeTemplates.admin.root}>
              <FormattedMessage id="app.layout.header.admin" defaultMessage="Admin" />
            </NavLink>}
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={routeTemplates.dashboard.claims}>
              <FormattedMessage id="app.layout.header.claims" defaultMessage="My Claims" />
            </NavLink>
          </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
          <UncontrolledNavDropdown>
            <DropdownToggle nav caret>
              {currentUser.name || currentUser.email}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag={Link} to={routeTemplates.auth.changePassword}>
                <FormattedMessage id="app.layout.header.change-password" defaultMessage="Change Password" />
              </DropdownItem>
              <DropdownItem onClick={this.props.logout.request} style={{ cursor: 'pointer' }}>
                <FormattedMessage id="app.layout.header.logout" defaultMessage="Logout" />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledNavDropdown>
        </Nav>
      </Collapse>
    );
  }

  render() {
    const { loggedIn, className } = this.props;

    return (
      <Navbar tag="header" fixed="top" toggleable="md" inverse className={classnames(className)}>
        <section ref={(el => this.navbar = el && el.parentElement)} className="container">
          <NavbarToggler right onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to="/">
            <h1 className="mb-0">
              <img src={brand.logo.white} alt="Logo" height="50" className="mr-2" />
              <span className="align-middle">{brand.name}</span>
            </h1>
          </NavbarBrand>
          {loggedIn ? this.renderUserNav() : this.renderAnonymousNav()}
        </section>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: selectIsLoggedIn(state),
    currentUser: selectCurrentUser(state),
    currentUserIsAdmin: selectIsCurrentUserAdmin(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: {
      request: bindActionCreators(logout.request, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Header));
