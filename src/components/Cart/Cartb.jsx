import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

class Cartb extends Component {
      constructor(props){
        super(props)
        this.state={
            cartItems:this.props.cartItems
        }
      }

render(){
    let {cartItems } = this.state
     let itemPic = cartItems.map((picture,i) => <p key={i}>{picture.img}</p>)
     let itemProduct = cartItems.map((product,i) => <p key={i}>{product.title}</p>)
     let itemPrice = cartItems.map((price,i) => <p key={i}>{price.price}</p>)
    
  return(
     <div className="row my-2 text-capitalize text-center">
        <div className="col-10 mx-auto col-lg-2 m-3">
            <img  src={itemPic} style={{width:'5rem', height: '5rem'}}
            className="img-fluid"
            alt="product" />
        </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none"> product: {itemProduct} </span>
                
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none"> price: </span>
            </div>
            <div className="col-10 mx-auto col-lg-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        

                    <span className="btn btn-black mx-1"></span>

                       
                </div>
            </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
            <div className="cart-icon">
                <i className="fas fa-trash"> </i>
            </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
            <strong> item total :  </strong>
        </div>
    </div>
    )
  }
}

export default Cartb;