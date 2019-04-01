import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {navOpts , navOptsLoggedIn, navHeadings} from '../data';

class NavBar extends Component {

  render() {

    let optsToDisplay = this.props.isLoggedIn ? navOptsLoggedIn : navOpts

    return(
    <React.Fragment>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Navbar.Brand className="mr-5" ><Link to="/" style={{color:'white',textDecoration: 'none'}}>Art Mart</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  {optsToDisplay.map((section,i) =>
                    <Nav key={i} className="mr-5">
                      <NavDropdown title={navHeadings[i]} id="collasible-nav-dropdown">
                        {section.map((item,j) => 
                        <Link className="m-3" 
                          key={j}
                          to={`${item.link}`} 
                          style={{color:'black',textTransform: "capitalize"}}>
                          {item.name.replace("-"," ").replace("-"," ")}<br></br>
                        </Link>)}
                    </NavDropdown>
                  </Nav>)}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </React.Fragment>
          );
        }
      }

export default NavBar;
