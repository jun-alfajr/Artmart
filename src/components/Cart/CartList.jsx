import React, { Component } from 'react';
import CartItem from './CartItem';

class CartList extends Component{

  render(){
    const {cart,value,increment,decrement} = this.props;
    console.log(`cart from cartlist: ${cart}`)

    return (
      <div className="container-fluid">
          {cart.map((item ,i) => {
              return <CartItem key={i} 
              item={item}
              value={value}
              increment={increment}
              decrement={decrement}
              />
          })}
      </div>
    )
  }
}

export default CartList;