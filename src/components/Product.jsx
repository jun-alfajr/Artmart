import React, { Component } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import PropTypes from 'prop-types';

export default class Product extends Component {

  render(){

    const {product_id, title, img, price, inCart } = this.props.product

    return (
        <ProductWrapper style={{maxWidth:400, minWidth: 360}} className="col-xs-9 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="card" style={{textTransform:"capitalize"}}>
            <ProductConsumer>
                {(value) => (
                    <div 
                    className="img-container" 
                    onClick={() => 
                    value.handleDetail(product_id)
                    }
                >
                    <Link to="/details">
                        <img 
                        src={img} 
                        alt="product" 
                        style={{height:300}}
                        className="card-img-top img-fluid img-responsive p-1"/>
                    </Link>
                    <button 
                        className="cart-btn" 
                        disabled={inCart ? true : false}
                        onClick={()=> {
                        value.addToCart(product_id);
                        value.openModal(product_id);
                        }}
                    >
                        {inCart ? (
                        <p className="text-capitalize mb-0" disabled>
                        {" "}
                        in cart
                        </p>
                        ) : (
                        <i className="fas fa-cart-plus"/>
                        )}
                    </button>
                    </div>
                )}

                    </ProductConsumer>
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">{title}</p>
                        <h5 className="text-blue font-italic mb-0">
                            <span className="mr-1">${price}</span>
                        </h5>
                    </div>
                </div>
        </ProductWrapper>
    )
  }
}

Product.propTypes = {
    product: PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    })
}

const ProductWrapper = styled.div`
.card{
    border-color:transparent;
    transition: all 1s linear;
    height:340px;
}
.card-footer{
    background: transparent;
    border-top: transparent;
    transition: al 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2)
    }
    .card-footer{
        background:rgba(247,247,247)
    }
}
.img-container{
    position:relative;
    overflow:hidden;
    height:320px;
}
.card-img-top{
    transition: all 1s linear;
}
.img-container:hover .card-img-top{
    transform(1.2);
}
.cart-btn{
    position:absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size:1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%,100%);
    transition: all 1s linear;
}
.img-container:hover .cart-btn {
    transform: translate(0,0);
}
.cart-btn:hover{
    color: var(--mainBlue);
    cursor: pointer;
}
`