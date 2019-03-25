import React, {Component} from 'react';


import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import {Form , Button, Col} from 'react-bootstrap'
import {signUpData} from '../data.js';
import axios from 'axios';

class Products extends Component{
  state={
    productAmount: '',
    total:1,
    amount:2
  }

  addCart(){
   
    console.log("working")
    let { total,amount} = this.state

      axios.post('/products/addtocart', {
        total,
        amount
        })
      .then((response) => {console.log(response)})
  
      .catch((err)=> console.log(err));
    
  }
  

    render(){
      const { validated } = this.state;
        return(
                <div>
                 <Form.Group  as={Col} >
                  <Form.Label>amount</Form.Label>
                  <Form.Control  required type="text" value={this.state.productAmount}  onChange={(e)=>this.setState({productAmount:e.target.value})} />
                  <Form.Control.Feedback type="invalid">
                    Please amount
                  </Form.Control.Feedback>
                </Form.Group>
            <Button  onClick={(e) => this.addCart(e)}>
                add to cart
            </Button>   
                </div>
        )
    }
}

export default withRouter(Products);


