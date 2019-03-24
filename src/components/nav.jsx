import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {navOpts , navHeadings} from '../data.js';
import ReactDOM from 'react-dom';

class NavBar extends Component {

  closeDropDown(e){
    console.log('printing from close dropdown');
    // console.log(e._reactInternalFiber._debugOwner.stateNode);

  }

  render() {
    return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand className="mr-5" ><NavLink to="/" style={{color:'white',textDecoration: 'none'}}>Art Mart</NavLink></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {navOpts.map((section,i) =>
            <Nav key={i}>
              <NavDropdown title={navHeadings[i]} id="collasible-nav-dropdown">
                {section.map((item,j) => <div key={j}>
                <NavLink className="m-3" 
                key={j}
                to={`${item.link}`} 
                onClick={(e)=>this.closeDropDown(e)}
                style={{color:'black',textTransform: "capitalize"}}>{item.name.replace("-"," ").replace("-"," ")}</NavLink>
                <br></br>
                </div>)}
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
