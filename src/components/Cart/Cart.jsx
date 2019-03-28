import React, { Component } from 'react'
import CartColumns from './CartColumns';
import EmptyCart from "./EmptyCart";
import {ProductConsumer} from '../../context';
import CartList from './CartList';
import CartTotals from './CartTotals';
import Hero from '../Hero';

export default class Cart extends Component {
  render() {
    return (
  <section>
    <Hero pageName={"My Cart"}/>
    <div className="container">
      <div className="row">
        <div className="col">
    <ProductConsumer>
      {value => {
        const {cart} = value;
        const {cartItems} = value;
        if(cart.length>0){
          return(
            <React.Fragment>
              <CartColumns />
              <CartList value={value}/>
              <CartTotals value={value}/>
            </React.Fragment>
          )
        }
        else{
          return <EmptyCart />
        }
      }}
    </ProductConsumer>
        </div>
      </div>
    </div>
  </section>
    )
  }
}
