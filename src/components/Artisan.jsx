import React, {Component} from 'react';
import Product from './Product';
import Hero from './Hero';
import {withRouter} from 'react-router-dom';
class Artisan extends Component{
    
        render(){
        let artist = this.props.match.params.artisan.replace("-"," ").replace("-"," ");
        let {cart, getAllProducts, isLoggedIn, products,handleDetail} = this.props
        let productsByArtisan = products.filter(product => product.artist === artist)

        return(
            <React.Fragment>
                <Hero pageName={artist}/>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            {   productsByArtisan.map(product => {
                                return <Product 
                                key={product.product_id}
                                product={product}
                                getAllProducts={getAllProducts}
                                inCart={cart === null ? false : cart.find(cartItem => cartItem.product_id === product.product_id) === undefined ? false : true}
                                isLoggedIn={isLoggedIn}
                                handleDetail={handleDetail}/>
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Artisan);