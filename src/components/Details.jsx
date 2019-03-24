
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
            <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
              <img src={img} className="img-fluid" alt="product"/>
            </div>
            <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
              <h4 className="text-blue"><strong>price: <span>$</span>{price}</strong></h4>
              <h4 className="text-title text-muted mt-3 mb-2">
                artist: <span style={{textTransform:"title-case"}}>{artist}</span>
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