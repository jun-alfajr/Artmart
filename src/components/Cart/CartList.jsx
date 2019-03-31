import React, { Component } from 'react';
import CartItem from './CartItem';

class CartList extends Component{

  render(){
    const {cart,value} = this.props;
    console.log(`cart from cartlist: ${cart}`)

    return (
      <div className="container-fluid">
          {cart.map((item ,i) => {
              return <CartItem key={i} 
              item={item}
              value={value}
              />
          })}
      </div>
    )
  }
}

export default CartList;