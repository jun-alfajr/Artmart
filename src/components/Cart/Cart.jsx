import React, { Component } from 'react'
import CartColumns from './CartColumns';
import EmptyCart from "./EmptyCart";
import {ProductConsumer} from '../../context';
import CartList from './CartList';
import CartTotals from './CartTotals';
import Hero from '../Hero';
import {withRouter} from 'react-router-dom';
import LogIn from '../Log-in';

class Cart extends Component {

  render() {

  let {isLoggedIn, cart, cartSubTotal, cartTax, cartTotal} = this.props;
  console.log(`cartSubTotal: ${cartSubTotal}`);
  console.log(`cartTax: ${cartTax}`)
  console.log(`cartTotal: ${cartTotal}`)

  return( isLoggedIn ? 
  <section>
    <Hero pageName={"My Cart"}/>
    <div className="container">
      <div className="row">
        <div className="col">
    <ProductConsumer>
      {value => {
        if(cart !== null){
          return(
            <React.Fragment>
              <CartColumns />
              <CartList cart={cart} value={value}/>
              <CartTotals cartSubTotal={cartSubTotal} cartTax={cartTax} cartTotal={cartTotal} value={value}/>
            </React.Fragment>
          )}
        else{
          return <EmptyCart />
        }
      }}
    </ProductConsumer>
        </div>
      </div>
    </div>
  </section> : <LogIn isLoggedIn={isLoggedIn}/>
  )}}

export default withRouter(Cart);