import React, {Component} from 'react';
import {Form , Button, Col} from 'react-bootstrap'
import {signUpData} from '../data.js';

class SignUp extends Component{

    render(){
        return(
          <Form>
            {signUpData.map((row,i) =>
              <Form.Row key={i}>
              {row.map((item, i) =>
                <Form.Group key={i} as={Col} >
                <Form.Label>{item.label}</Form.Label>
                <Form.Control type={item.type} />
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