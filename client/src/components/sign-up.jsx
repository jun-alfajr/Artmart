import React, {Component} from 'react';
import {Form , Button, Col} from 'react-bootstrap'
import {signUpData} from '../data.js';
import axios from 'axios';

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
    profilePic:'',
    checkbox:false,
    errMsg:'',
    validated:false
    
  }

  signUp(e){
    e.preventDefault()
    const form = e.currentTarget;
    console.log("working")
    let { username, password,email, address, city, state, zipcode, profilePic,checkbox,validated,confirmPassword} = this.state

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
     this.setState({ validated: true });
    
    if(!checkbox){
      this.setState({errMsg:'Please check the agreement box'})
    }else if(username < 1 || password < 1 || email < 1 || address < 1 || city < 1 || state < 1 || zipcode< 1 || profilePic < 1){
      this.setState({errMsg:'Please fill in all spaces input fields'})
      return
    }else if(password.length < 8){
      this.setState({errMsg:'Password must be at least 8 characters'})
      return
    }
    else if(zipcode.length != 5){
      this.setState({errMsg:'please enter correct zipcode'})
      return
    }else if (password != confirmPassword){
      this.setState({errMsg:'Passwords do not match'})
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
  // this was used to redirect to main page
  //  .then(()=> axios.post('/users/login',{ username, password}))
  //           .then(() => this.props.signin())
  //           .catch((err) => console.log(err))
  
  

    render(){
      const { validated } = this.state;
        return(
          <Form 
          noValidate
          validated={validated}
          onSubmit={(e) => this.signUp(e)}>
            
              <Form.Row >
                <Form.Group  as={Col} >
                  <Form.Label>Username</Form.Label>
                  <Form.Control  required type="text" value={this.state.username}  onChange={(e)=>this.setState({username:e.target.value})} />
                  <Form.Control.Feedback type="invalid">
                    Please enter a username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group  as={Col} >
                  <Form.Label>email</Form.Label>
                  <Form.Control required type="email" value={this.state.email}  onChange={(e)=>this.setState({email:e.target.value})} />
                  <Form.Control.Feedback type="invalid">
                    Please enter an email.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row >
                <Form.Group  as={Col} >
                  <Form.Label>PassWord</Form.Label>
                  <Form.Control required type="password" value={this.state.password}   onChange={(e)=>this.setState({password:e.target.value})}/>
                  <Form.Control.Feedback type="invalid">
                    Please enter a password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group  as={Col} >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control  required type="password" value={this.state.confirmPassword}   onChange={(e)=>this.setState({confirmPassword:e.target.value})}/>
                  <Form.Control.Feedback type="invalid">
                    Please enter a password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row >
                <Form.Group  as={Col} >
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" value={this.state.address}   onChange={(e)=>this.setState({address:e.target.value})} />
                <Form.Control.Feedback type="invalid">
                    Please enter an address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row >
                <Form.Group  as={Col} >
                  <Form.Label>City</Form.Label>
                  <Form.Control required type="text" value={this.state.city}   onChange={(e)=>this.setState({city:e.target.value})} />
                  <Form.Control.Feedback type="invalid">
                    Please enter a City.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" required  onChange={(e)=>this.setState({state:e.target.value})}>
                  <Form.Control.Feedback type="invalid">
                      Please enter a zipcode.
                  </Form.Control.Feedback>
                    {/* <option>Choose...</option> */}
                    <option>GA</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group  as={Col} >
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control type="number" required value={this.state.zipcode}   onChange={(e)=>this.setState({zipcode:e.target.value})} />
                  <Form.Control.Feedback type="invalid">
                    Please enter a zipcode.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row >
                <Form.Group  as={Col} >
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file"  onChange={(e)=>this.setState({profilePic:e.target.value})} />
                </Form.Group>
              </Form.Row>
              <Form.Row >
                <Form.Group  as={Col} >
                <Form.Label>I have read and agree to follow the terms</Form.Label>
                <Form.Control type="checkbox"  required onChange={()=>{
                  if(!this.state.checkbox){
                    this.setState({checkbox:true})
                  }else {
                    this.setState({checkbox:false})
                  }
                }} />
                <Form.Control.Feedback type="invalid">
                    Please agree to statement
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              

            <Button variant="light" type="submit" style={{border:"1px solid black"}}>
              Submit
            </Button>
          </Form>
        )
    }
}

export default SignUp;


{/* <Form onSubmit={(e) => this.signUp(e)}>
            {signUpData.map((row,i) =>
              <Form.Row key={i}>
              {row.map((item, i) =>
                <Form.Group key={i} as={Col} >
                <Form.Label>{item.label}</Form.Label>
                <Form.Control type={item.type} value={this.state[item.type]}  onChange={this.handleChangeFor('firstName')} />
                </Form.Group>
                )}
              </Form.Row>
              )}

            <Button variant="light" type="submit" style={{border:"1px solid black"}}>
              Submit
            </Button>
          </Form> */}