import React, {Component} from 'react';
import {Navbar, Nav, NavbarBrand, NavItem, NavLink} from 'reactstrap';

export default class MyNavbar extends Component<{}> {
  render() {
    return (
      <div id='navbar'>
        <Navbar>
          <NavbarBrand href='/'>
            Game Exchange
          </NavbarBrand>
            <NavItem>
              <NavLink href='/listing/all'>
                Home / View All Listings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/user/register'>
                Create Account
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/user/login'>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/orders/all'>
                View Orders
              </NavLink>
            </NavItem>
        </Navbar>
      </div>
    )
  }
}