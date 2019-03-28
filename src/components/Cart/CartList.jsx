import React from 'react';
import CartItem from './CartItem';

export default function CartList({value}) {
    const {cart} = value;
    const {cartItems} = value;

  return (
    <div className="container-fluid">
        {cartItems.map(item => {
            return <CartItem key={item.product_id} 
            item={item}
            value={value}/>
        })}
    </div>
  )
}