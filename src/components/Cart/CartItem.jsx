import React from 'react'

export default function CartItem({item,value,increment,decrement}) {
    const {product_id,title,img,price,total,count} = item;
    const {removeItem} = value;

  return (
    <div className="row my-2 text-capitalize text-center">
        <div className="col-10 mx-auto col-lg-2 m-3">
            <img src={img} style={{width:'5rem', height: '5rem'}}
            className="img-fluid"
            alt="product" />
        </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none"> product: </span>
                {title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none"> <strong> price: ${price}</strong> </span>
            </div>
            <div className="col-10 mx-auto col-lg-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1" 
                        onClick={() => 
                        decrement(product_id)}>
                            -
                        </span>

                    <span className="btn btn-black mx-1">{count}</span>

                        <span className="btn btn-black mx-1" 
                        onClick={() =>
                        increment(product_id)}>
                        +
                        </span>
                </div>
            </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
            <div className="cart-icon" onClick={() => removeItem(product_id)}>
                <i className="fas fa-trash"> </i>
            </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
            <strong> item total : $ {total} </strong>
        </div>
    </div>
  )
}