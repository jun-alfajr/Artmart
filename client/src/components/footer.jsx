import React, {Component} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {NavLink} from 'react-router-dom';
import {columns, headings} from '../data.js';
import '../App.css';
class Footer extends Component {
  render(){
  return (
    <MDBFooter color="mdb-color" className="font-small">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="text-center mt-3 pb-3">
            {columns.map((currentCol,i)=>
            <MDBCol key={i} md="3" lg="3" xl="3" className="mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">{headings[i]}</h6>
              <hr></hr>
            {currentCol.map((item,j)=>
            <p key={j}>
            {item.isLink ? <NavLink className="footer-link" to={`/${item.name.replace("/","-")}`} style={{color: 'black'}}>
            {item.name[0].toUpperCase() + item.name.slice(1).replace("-"," ")}
            </NavLink> : item.name}
            </p>)}
            </MDBCol>)}
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}
}

export default Footer;