import React, { Component } from 'react';
import CartItem from './CartItem';

class CartList extends Component{

  render(){
    const {cart,increment,decrement,removeItem} = this.props;
    console.log(`cart from cartlist: ${cart}`)

    return (
      <div className="container-fluid">
          {cart.map((item ,i) => {
              return <CartItem key={i} 
              item={item}
              increment={increment}
              decrement={decrement}
              removeItem={removeItem}
              />
          })}
      </div>
    )
  }
}

export default CartList;