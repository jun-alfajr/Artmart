import React, {Component} from 'react';
import {Form , Button, Col} from 'react-bootstrap'
import {signUpData} from '../data.js';
import axios from 'axios';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

class Cart extends Component{
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

  
  

    render(){
      const { validated } = this.state;
        return(
          <div>
              <section>
              <div className="container-fluid text-center d-none d-lg-block">
                    <div className="row">
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">products</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">name of product</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">price</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">quantity</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">remove</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">total</p>
                        </div>
                    </div>
                    </div>
            <div className="className">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right"> 
                        <h5>
                            <span className="text-title"> 
                                <strong>subtotal : </strong>
                            </span>
                        </h5>
                        <h5>
                            <span className="text-title"> 
                                <strong>tax : </strong>
                            </span>
                        </h5>
                        <h5>
                            <span className="text-title"> 
                                <strong>total : </strong>
                            </span>
                        </h5>
                    </div>
                </div>
            </div>
  </section>
          </div>
        )
    }
}

export default withRouter(Cart);


