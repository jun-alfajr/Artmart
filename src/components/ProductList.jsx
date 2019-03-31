import React, {Component} from 'react';
import Product from './Product';
import Hero from './Hero';
import {ProductConsumer} from '../context';
import {withRouter} from 'react-router-dom';

class ProductList extends Component{

    render(){
        
        let selectedProductType = this.props.match.params.productType;
        let {getAllProducts, isLoggedIn, cart} = this.props

        return(
            <React.Fragment>
                <Hero pageName={selectedProductType}/>
                    <div className="container">
                        <div className="row">
                            <ProductConsumer>
                                { value => selectedProductType === "all" ? value.products.map(product => {
                                        return <Product key={product.product_id}
                                        product={product}
                                        isLoggedIn={isLoggedIn}
                                        inCart={cart === null ? false : cart.find(cartItem => cartItem.product_id === product.product_id) === undefined ? false : true}
                                        getAllProducts={getAllProducts}
                                        /> })
                                        :
                                        value.products.filter(product => product.product_type === selectedProductType)
                                        .map(product => <Product key={product.product_id} 
                                            getAllProducts={getAllProducts} 
                                            product={product} 
                                            inCart={ cart === null ? false : cart.find(cartItem => cartItem.product_id === product.product_id) === undefined ? false : true}
                                            isLoggedIn={isLoggedIn}/>
                                )}
                            </ProductConsumer>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default withRouter(ProductList);