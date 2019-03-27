import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {navOpts , navHeadings} from '../data.js';

class NavBar extends Component {

  render() {
    return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
    <Navbar.Brand className="mr-5" ><Link to="/" style={{color:'white',textDecoration: 'none'}}>Art Mart</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {navOpts.map((section,i) =>
            <Nav key={i} className="mr-5">
              <NavDropdown title={navHeadings[i]} id="collasible-nav-dropdown">
                {section.map((item,j) => 
                <NavDropdown.Item key={j}>
                  <Link className="m-3" 
                    key={j}
                    to={`${item.link}`} 
                    style={{color:'black',textTransform: "capitalize"}}>
                    {item.name.replace("-"," ").replace("-"," ")}
                  </Link>
                </NavDropdown.Item>)}
              </NavDropdown>
            </Nav>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default NavBar;
