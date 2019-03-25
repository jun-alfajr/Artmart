
import React, { Component } from 'react'
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
import Hero from './Hero';

export default class Details extends Component {
  render() {
    return (
<ProductConsumer>
  {(value) => {
    const {product_id,title,artist,img,price,info,inCart} = value.detailProduct; 
    return (
      <React.Fragment>
        <Hero pageName={title}/>
      <div className="container py-5">
        <div className="row">
        </div>
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <img src={img} style={{height:400,width:400}} className="img-fluid" alt="product"/>
            </div>
            <div className="col-10 mx-auto col-md-6 my-3">
              <h4><strong>Price: <span>$</span>{price}</strong></h4>
              <h4 className="mt-3 mb-2">
                Artist: <span >{artist}</span>
              </h4>
              <p className="text-muted lead">
                {info}
              </p>
                <div>
                  <Link to="/products/all">
                  <ButtonContainer>back to products</ButtonContainer>
                  </Link>
                  <ButtonContainer
                  cart
                  disabled={inCart ? true : false}
                  onClick={()=>{
                    value.addToCart(product_id);
                    value.openModal(product_id);
                  }}>
                    {inCart? "inCart" : "add to cart"}
                  </ButtonContainer>
                </div>
              </div>
          </div>
      </div>
      </React.Fragment>
    )
  }}
</ProductConsumer>
    )
  }
}