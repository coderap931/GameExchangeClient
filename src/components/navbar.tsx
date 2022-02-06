import React, {Component} from 'react';
import {Navbar} from 'reactstrap';

export default class Navbar extends Component<{}> {
  render() {
    return (
      <div id='navbar'>
        <Navbar
          color='light'
          expand='md'
          light
        >
          <NavbarBrand href='/'>
            Game Exchange
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck(){}} />
          <Collapse navbar>
            <Nav
              className='me-auto'
              navbar
            >
            <NavItem>
              <NavLink href='/user/register'>
                Create Account
              </NavLink>
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
            <NavItem>
              <NavLink href='/about'>
                About Us
              </NavLink>
            </NavItem>
          </Collase>  
        </Navbar>
      </div>
    )
  }
}