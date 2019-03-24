import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {navOpts , navHeadings} from '../data.js';

class NavBar extends Component {
  render() {
    return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand className="mr-5" ><NavLink to="/" style={{color:'white',textDecoration: 'none'}}>Art Mart</NavLink></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {navOpts.map((section,i) =>
            <Nav.Link key={i}>
              <NavDropdown title={navHeadings[i]} id="collasible-nav-dropdown">
                {section.map((item,j) => <div key={j}><NavLink className="m-3" to={`/${item.name.replace("/","-")}`} style={{color:'black'}}>{item.name.replace("-"," ")}</NavLink><br></br></div>)}
              </NavDropdown>
            </Nav.Link>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default NavBar;
