import React, {Component} from 'react';
import {Form , Button, Col} from 'react-bootstrap'
import {logInData} from '../data.js';

class LogIn extends Component{

    render(){
        return(
        <Col md={{ span: 5, offset: 3 }}>
            <Form>
            {logInData.map((item,i) => 
            <Form.Group as={Col} key={i} >
                <Form.Label>{item.label}</Form.Label>
                <Form.Control type={item.type} />
            </Form.Group>)} 
            <div className="text-center">  
                <Button variant="light" type="submit" style={{border:"1px solid black"}}>Submit</Button>
            </div>
            </Form>
        </Col>
        )
    }
}

export default LogIn;