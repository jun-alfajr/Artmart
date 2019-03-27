import React, {Component} from 'react';
import {Form , Button, Col, Row, Container} from 'react-bootstrap'
import {signUpData} from '../data.js';
import axios from 'axios';
import Hero from './Hero';
import {ProductConsumer} from '../context';

class SignUp extends Component{
  state={
   
    
  }
  componentDidMount(){
    axios.post('/users/logout')
    .then(this.props.history.push('/'))
    .catch(err => console.log(err))
  }

  

    render(){
      const { validated } = this.state;
        return(
        <React.Fragment>
          <Hero pageName={"You have been logged Out"}/>
          
          </React.Fragment>
        )
    }
}

export default SignUp;


