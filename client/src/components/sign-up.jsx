import React, {Component} from 'react';
import {Form , Button, Col} from 'react-bootstrap'
import {signUpData} from '../data.js';
import axios from 'axios';

class SignUp extends Component{
  state={
    username: 'benjamin',
    password: 'asnnkjndf',
    email:'blin@gmail.com',
    address:'pine street',
    city:'atlanta',
    state:'asdas',
    zipcode: 303,
    profilePic:'/sdf/sdf',
    errMsg:''
  }

  signUp(e){
    e.preventDefault()
    console.log("working")
    let { username, password,email, address, city, state, zipcode, profilePic} = this.state
    if(username < 1 || password < 1 || email < 1 || address < 1 || city < 1 || state < 1 || zipcode< 1 || profilePic < 1){
      this.setState({errMsg:'Please fill in all spaces input fields'})
      return
    }else if(password.length < 8){
      this.setState({errMsg:'Password must be at least 8 characters'})
      return
    }else{
      console.log("helloe")
      axios.post('/users/register', {
        username,
        password,
        email,
        address,
        city,
        state,
        zipcode,
        profilePic
        })
      .then((response) => {console.log(response)})
         
      .catch((err)=> console.log(err));
    }
  }

  //  .then(()=> axios.post('/users/login',{ username, password}))
  //           .then(() => this.props.signin())
  //           .catch((err) => console.log(err))
  handleInput(input){
    this.setState({username: input})
  }

  

    render(){
        return(
          <Form onSubmit={(e) => this.signUp(e)}>
            {signUpData.map((row,i) =>
              <Form.Row key={i}>
              {row.map((item, i) =>
                <Form.Group key={i} as={Col} >
                <Form.Label>{item.label}</Form.Label>
                <Form.Control type={item.type} value={this.state.label}  onChange={(e) => this.handleInput(e.target.value)}/>
                </Form.Group>
                )}
              </Form.Row>
              )}

            <Button variant="light" type="submit" style={{border:"1px solid black"}}>
              Submit
            </Button>
          </Form>
        )
    }
}

export default SignUp;