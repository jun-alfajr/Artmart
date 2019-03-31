
import React, { Component } from 'react'
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
import Hero from './Hero';
import {withRouter} from 'react-router-dom';

class Details extends Component {
  render() {
    let {isLoggedIn,cart} = this.props;
    return (
<ProductConsumer>
  {(value) => {
    const {product_id,title,artist,img,price,info} = value.detailProduct;
    let inCart = false; 
    if(cart !== null ){
    inCart = cart.find(cartItem => cartItem.product_id === product_id) === undefined ? false : true;
    }
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
                  <ButtonContainer onClick={()=>this.props.history.goBack()}>
                    back to products
                  </ButtonContainer>
                  <ButtonContainer
                  cart
                  disabled={inCart ? true : false}
                  onClick={()=>{ isLoggedIn ?
                    value.addToCartAndOpenModal(product_id) :
                    this.props.history.push("/log-in");
                  }}>
                    {inCart ? "inCart" : "add to cart"}
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

export default withRouter(Details);