import React, {Component} from 'react';


import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import {Form , Button, Col} from 'react-bootstrap'
import {signUpData} from '../data.js';
import axios from 'axios';

class Products extends Component{
  state={
    incart:true,
    product_id:"1"
  }



  addCart(){
    let {incart,product_id} = this.state

      axios.post('/products/addtocart', {
       incart,
       product_id
        })
      .then((response) => {console.log(response)})
  
      .catch((err)=> console.log(err));
    
  }
  

    render(){
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


