import React from 'react';

export default function EmptyCart() {
  return (
    <div className="container m-5" style={{height:200}}>
      <div className="row">
        <div className="col-xs-12">
            <h1>No items in Cart</h1>
        </div>
      </div>
    </div>
  )
}