import React, {Component} from 'react';
import {Form , Button, Col,Container, Row, Alert} from 'react-bootstrap'
import axios from 'axios';
import Hero from './Hero';
import {withRouter} from 'react-router-dom';

class LogIn extends Component{
    state={
        username: '',
        password: '',
        errMsg: '',
      }
  
    login(e){
      e.preventDefault()
      let { username, password } = this.state
      let creds = {
          username,
          password
      }

        axios.post('/login', creds)
        .then((response) => {
        console.log(response)
        this.props.getUser()
        this.props.history.push("/")})
        .catch(() => this.setState({errMsg : "Wrong username or password."}))
      }
  
    handleUsernameInput(input){
      this.setState({username: input})
    }
  
    handlePasswordInput(input){
      this.setState({password: input})
    }
    render(){
      if(this.props.isLoggedIn){
        this.props.history.push("/")
      }
      let {errMsg} = this.state
        return(
        <React.Fragment>
          <Hero pageName={"Log-In"}/>
          <Container>
            <Row >
              <Col md={{ span: 5, offset: 3 }} >
              {errMsg ? <Alert className="text-center" variant="danger">{errMsg}</Alert> : null }
                  <Form className="mt-5 mb-5" onSubmit={(e) => this.login(e)}>
                  <Form.Group  as={Col} >
                        <Form.Label>Username</Form.Label>
                        <Form.Control   required 
                                        type="text" 
                                        name="username" 
                                        value={this.state.username}  
                                        onChange={(e)=>this.setState({username:e.target.value})} />
                        <Form.Control.Feedback type="invalid">
                          Please enter a username
                        </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group  as={Col} >
                        <Form.Label>Password</Form.Label>
                        <Form.Control   required 
                                        type="password" 
                                        name="password" 
                                        value={this.state.password}  
                                        onChange={(e)=>this.setState({password:e.target.value})} />
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
        </React.Fragment>)
    }
}

export default withRouter(LogIn);