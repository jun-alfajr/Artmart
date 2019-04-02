import React, { Component } from 'react'
import CartColumns from './CartColumns';
import EmptyCart from "./EmptyCart";
import CartList from './CartList';
import CartTotals from './CartTotals';
import Hero from '../Hero';
import {withRouter} from 'react-router-dom';
import LogIn from '../Log-in';
import {Container,Row,Col} from 'react-bootstrap';
class Cart extends Component {

  render() {

  let {isLoggedIn, cart, cartSubTotal, cartTax, cartTotal , increment , decrement, removeItem, clearCart} = this.props;
    console.log(`cart from Cart: ${cart}`);
    
  return( isLoggedIn ? 
  <section>
    <Hero pageName={"My Cart"}/>
      <Container>
        <Row>
          <Col>
            {(cart === null ? <EmptyCart /> :
              cart.length < 1 ? <EmptyCart /> :
              (
                  <React.Fragment>
                    <CartColumns />
                      <CartList cart={cart} 
                                increment={increment} 
                                decrement={decrement} 
                                removeItem={removeItem}/>
                      <CartTotals cartSubTotal={cartSubTotal} 
                                  cartTax={cartTax} 
                                  cartTotal={cartTotal} 
                                  clearCart={clearCart}/>
                  </React.Fragment>
              ))}
            </Col>
          </Row>
        </Container>
  </section> : <LogIn isLoggedIn={isLoggedIn}/>
  )}}

export default withRouter(Cart);