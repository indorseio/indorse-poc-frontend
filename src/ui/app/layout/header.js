import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';

import brand from 'resources/brand';

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

  render() {
    const { className } = this.props;

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
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="ml-auto">
              <NavItem>
                <NavLink tag={Link} to="/" onClick={this.collapseNavbar}>
                  <FormattedMessage id="app.layout.header.home" defaultMessage="Home" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </section>
      </Navbar>
    );
  }
}

export default injectIntl(Header);
