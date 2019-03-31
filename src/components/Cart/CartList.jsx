import React, { Component } from 'react';
import CartItem from './CartItem';

class CartList extends Component{

  render(){
    const {cart} = this.props.value;

    return (
      <div className="container-fluid">
          {cart.map((item ,i) => {
              return <CartItem key={i} 
              item={item}
              value={this.props.value}
              />
          })}
      </div>
    )
  }
}

export default CartList;