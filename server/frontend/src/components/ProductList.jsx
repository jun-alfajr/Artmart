import React, {Component} from 'react';
import Product from './Product';
import Hero from './Hero';
import {withRouter} from 'react-router-dom';

class ProductList extends Component{

    render(){
        
        let selectedProductType = this.props.match.params.productType;
        let {isLoggedIn, cart, handleDetail, addToCartAndOpenModal, products} = this.props
        console.log(products);
        return(
            <React.Fragment>
                <Hero pageName={selectedProductType}/>
                    <div className="container">
                        <div className="row">
                                { selectedProductType === "all" ? products.map(product => {
                                return <Product key={product.product_id}
                                product={product}
                                isLoggedIn={isLoggedIn}
                                inCart={cart === null ? false : cart.find(cartItem => cartItem.product_id === product.product_id) === undefined ? false : true}
                                handleDetail={handleDetail}
                                addToCartAndOpenModal={addToCartAndOpenModal}
                                /> })
                                :
                                products.filter(product => product.product_type === selectedProductType)
                                .map(product => <Product key={product.product_id} 
                                product={product} 
                                inCart={ cart === null ? false : cart.find(cartItem => cartItem.product_id === product.product_id) === undefined ? false : true}
                                isLoggedIn={isLoggedIn}
                                handleDetail={handleDetail}
                                addToCartAndOpenModal={addToCartAndOpenModal}/>
                                )}
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default withRouter(ProductList);