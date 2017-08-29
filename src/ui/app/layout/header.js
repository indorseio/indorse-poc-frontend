import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { UncontrolledNavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import classnames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { NavLink as RouterLink } from 'react-router-dom';
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

  logout() {
    this.collapseNavbar();
    this.props.logout.request();
  }

  renderAnonymousNav() {
    return (
      <Collapse isOpen={this.state.isOpen} navbar onClickCapture={this.collapseNavbar}>
        <Nav navbar className="ml-auto">
          <NavItem>
            <NavLink tag={RouterLink} to={routeTemplates.auth.login}>
              <FormattedMessage id="app.layout.header.login" defaultMessage="Login" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterLink} to={routeTemplates.auth.signUp}>
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
        <Nav navbar className="mr-auto" onClickCapture={this.collapseNavbar}>
          <NavItem>
            {currentUserIsAdmin && <NavLink tag={RouterLink} to={routeTemplates.admin.root}>
              <FormattedMessage id="app.layout.header.admin" defaultMessage="Admin" />
            </NavLink>}
          </NavItem>
          <NavItem>
            <NavLink tag={RouterLink} to={routeTemplates.claims.root}>
              <FormattedMessage id="app.layout.header.claims" defaultMessage="My Claims" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterLink} to={routeTemplates.votes.root}>
              <FormattedMessage id="app.layout.header.votes" defaultMessage="My Votes" />
            </NavLink>
          </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
          {currentUser.scoreCount ? <li className="navbar-text mx-4">
            <FormattedMessage
              id="app.layout.header.score"
              defaultMessage="My Score: {score}"
              values={{ score: currentUser.scoreCount }} />
          </li> : null}
          <UncontrolledNavDropdown>
            <DropdownToggle nav caret>
              {currentUser.name || currentUser.email}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag={RouterLink} to={routeTemplates.auth.changePassword} onClick={this.collapseNavbar}>
                <FormattedMessage id="app.layout.header.change-password" defaultMessage="Change Password" />
              </DropdownItem>
              <DropdownItem onClick={this.logout} style={{ cursor: 'pointer' }}>
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
          <NavbarBrand tag={RouterLink} to="/" replace>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false /* This is required for link 'active' feature to work when route is changed. It works on refresh without this */
})(injectIntl(Header));
