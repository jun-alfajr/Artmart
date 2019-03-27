import React, {Component} from 'react';
import {Form , Button, Col,Container, Row, Alert} from 'react-bootstrap'
import {logInData} from '../data.js';
import axios from 'axios';
import Hero from './Hero';
import {ProductConsumer} from '../context';



class LogIn extends Component{
    state={
        username: '',
        password: '',
        errMsg: '',
        validated:false
      }
  
    login(e){
        
      e.preventDefault()
      const form = e.currentTarget;
      let { username, password,validated } = this.state
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
       this.setState({ validated: true });
      if(username < 1 || password < 1){
        this.setState({errMsg : 'Please fill in both input fields'})
        return
      }else{
        axios.post('/users/login', { username, password})
          .then(() => this.props.history.push('/products/all'))
          .catch(() => this.setState({errMsg:'user not found'}))
      }

    }
  
    handleUsernameInput(input){
      this.setState({username: input})
    }
  
    handlePasswordInput(input){
      this.setState({password: input})
    }
    render(){
      let {errMsg} = this.state
        const { validated } = this.state;
        return(
        <React.Fragment>
          <Hero pageName={"Log-In"}/>
          <Container>
             <Row>
                  <Col md={{ span: 5, offset: 3 }}>
                  {errMsg ? <Alert variant="danger">{errMsg}</Alert> : null }
                      <Form
                      noValidate
                      validated={validated}
                      onSubmit={(e) => this.login(e)}>
                      <Form.Group  as={Col} >
                            <Form.Label>Username</Form.Label>
                            <Form.Control  required type="text" value={this.state.username}  onChange={(e)=>this.setState({username:e.target.value})} />
                            <Form.Control.Feedback type="invalid">
                              Please enter a username
                            </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group  as={Col} >
                            <Form.Label>Password</Form.Label>
                            <Form.Control  required type="password" value={this.state.password}  onChange={(e)=>this.setState({password:e.target.value})} />
                            <Form.Control.Feedback type="invalid">
                              Please enter a password
                            </Form.Control.Feedback>
                      </Form.Group>
                      <div className="text-center">  
                          <Button variant="light" type="submit" style={{border:"1px solid black"}}>Submit</Button>
                      </div>
                      </Form>
                    </Col>
                </Row>
          </Container>
        </React.Fragment>
        )
    }
}

export default LogIn;