import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import Hero from './Hero';
import {ButtonContainer} from './Button';


class LogOut extends Component{

  logOut(){
    axios.post('/logout')
    .then((response) => {
    console.log(response)
    this.props.getUser()
    this.props.history.push("/")})
    .catch(err => console.log(err))

  }

render(){
      return(
        <React.Fragment>
          <Hero className="mb-5" pageName={"Until next time...."}/>
          <Container>
            <Row>
                <div className="text-center">
                <ButtonContainer className="m-5" onClick={()=> 
                    this.logOut()}>
                    Log Out
                </ButtonContainer>
                </div>
              <Col className="text-center">
              <img className="img-fluid mb-5" src="/img/bye.jpg" alt="bye"/>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      )
    }
  }

export default withRouter(LogOut);