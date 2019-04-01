import React, {Component} from 'react';
import {Form , Button, Col, Row, Container, Alert} from 'react-bootstrap'
import axios from 'axios';
import Hero from './Hero';
import SelectUSState from 'react-select-us-states';
import {withRouter} from 'react-router-dom';
class SignUp extends Component{
  state={
    username: '',
    email:'',
    password: '',
    confirmPassword: '',
    address:'',
    city:'',
    state:'',
    zipcode: '',
    checkbox:false,
    errMsg:'',
  }

  toggleCheckBox(){
    this.setState({checkbox: !this.state.checkbox})
  }
  

  signUp(e){
    e.preventDefault()
    let { username, password,email, address, city, state, zipcode,checkbox,confirmPassword} = this.state
    let usr = {...this.state}
    
    if(!checkbox){
      this.setState({errMsg:'Please check the agreement box'})
      return
    }

    if(username.length < 1 || password.length < 1 || email.length < 1 || address.length < 1 || city.length < 1 || state.length < 1 || zipcode.length < 1 ){
      this.setState({errMsg:'Please complete all input fields'})
      return
    }
    if(password.length < 8){
      this.setState({errMsg:'Password must be at least 8 characters'})
      return
    }
    if(zipcode.length !== 5){
      this.setState({errMsg:'Invalid zipcode'})
      return
    }
    if (password !== confirmPassword){
      this.setState({errMsg:'Passwords do not match'})
      return
    }

      axios.post('/createNewAccount', usr )
      .then((response) => {
        console.log(response)
        this.props.getUser()
        this.props.history.push('/products/all')})
      .catch((err)=> console.log(err));
    }

    render(){
      if(this.props.isLoggedIn){
        this.props.history.push("/")
      }
      let {errMsg} = this.state
        return(
        <React.Fragment>
          <Hero pageName={"Sign-up"}/>
          <Container>
            <Row>
              <Col>
                  {errMsg ? <Alert variant="danger">{this.state.errMsg}</Alert> : null }
                    <Form 
                    className="mb-5"
                    onSubmit={(e) => this.signUp(e)}>
                        <Form.Row >
                          <Form.Group  as={Col} >
                            <Form.Label>Username</Form.Label>
                            <Form.Control  required type="text" 
                                                    name="username" 
                                                    value={this.state.username}  
                                                    onChange={(e)=>this.setState({username:e.target.value})} />
                            <Form.Control.Feedback type="invalid">
                              Please enter a username.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group  as={Col} >
                            <Form.Label>email</Form.Label>
                            <Form.Control required  type="email" 
                                                    value={this.state.email}  
                                                    onChange={(e)=>this.setState({email:e.target.value})} />
                            <Form.Control.Feedback type="invalid">
                              Please enter an email.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row >
                          <Form.Group  as={Col} >
                            <Form.Label>Password</Form.Label>
                            <Form.Control required  type="password" 
                                                    name="password" 
                                                    value={this.state.password}   
                                                    onChange={(e)=>this.setState({password:e.target.value})}/>
                            <Form.Control.Feedback type="invalid">
                              Please enter a password.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group  as={Col} >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control   required type="password" 
                                            value={this.state.confirmPassword}   
                                            onChange={(e)=>this.setState({confirmPassword:e.target.value})}/>
                            <Form.Control.Feedback type="invalid">
                              Please enter a password.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row >
                          <Form.Group  as={Col} >
                          <Form.Label>Address</Form.Label>
                          <Form.Control required type="text" 
                                        value={this.state.address}   
                                        onChange={(e)=>this.setState({address:e.target.value})} />
                          <Form.Control.Feedback type="invalid">
                              Please enter an address.
                          </Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row >
                          <Form.Group  as={Col} >
                            <Form.Label>City</Form.Label>
                            <Form.Control required  type="text" 
                                                    value={this.state.city}   
                                                    onChange={(e)=>this.setState({city:e.target.value})} />
                            <Form.Control.Feedback type="invalid">
                              Please enter a City.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridState">
                              <Form.Label>State</Form.Label>
                              <br></br>
                              <SelectUSState  className="w-100" 
                                              style={{height: "50px"}}  
                                              required onChange={(e) => this.setState({state:e})}/>
                          </Form.Group>
                          <Form.Group  as={Col} >
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control type="number" 
                                          required value={this.state.zipcode}   
                                          onChange={(e)=>this.setState({zipcode:e.target.value})} />
                            <Form.Control.Feedback type="invalid">
                              Please enter a zipcode.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row >
                          <Form.Group  as={Col} >
                          <Form.Label>I have read and agree to follow the terms</Form.Label>
                          <Form.Control type="checkbox" required onClick={()=> this.toggleCheckBox()} />
                          <Form.Control.Feedback type="invalid">
                              Please agree to statement
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>
                      <Button variant="light" type="submit" style={{border:"1px solid black"}}>
                        Submit
                      </Button>
                    </Form>
                </Col>
              </Row>
            </Container>
        </React.Fragment>
        )
    }
}

export default withRouter(SignUp);
