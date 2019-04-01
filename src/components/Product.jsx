import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import ProductWrapper from './ProductWrapper';
class Product extends Component {

    render(){

    const {product_id, title, img, price } = this.props.product
    let {isLoggedIn,inCart, handleDetail, addToCartAndOpenModal} = this.props
    
    return (
        <ProductWrapper style={{maxWidth:400, minWidth: 360}} 
                        className="col-xs-9 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="card" style={{textTransform:"capitalize"}}>
                    <div 
                        className="img-container" 
                        onClick={() => 
                        handleDetail(product_id)
                    }>
                    <Link to="/details">
                        <img 
                        src={img} 
                        alt="product" 
                        style={{height:300}}
                        className="card-img-top img-fluid img-responsive p-1"/>
                    </Link>
                    {isLoggedIn ? 
                    <button 
                        className="cart-btn" 
                        disabled={inCart ? true : false}
                        onClick={()=> { 
                        addToCartAndOpenModal(product_id)
                    }}>
                        {inCart ? (
                            <p className="text-capitalize mb-0" disabled>
                                {" "}
                                in cart
                            </p>) : (
                            <i className="fas fa-cart-plus"/>
                        )}
                    </button> : null }
                    </div>
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

export default withRouter(Product);

Product.propTypes = {
    product: PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    })
}
