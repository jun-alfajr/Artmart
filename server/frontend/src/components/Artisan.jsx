import React, {Component} from 'react';
import Product from './Product';
import Hero from './Hero';
import {withRouter} from 'react-router-dom';
import {Container,Row} from 'react-bootstrap';
class Artisan extends Component{
    
        render(){
        let artist = this.props.match.params.artisan.replace("-"," ").replace("-"," ");
        let {cart,isLoggedIn, products,handleDetail, addToCartAndOpenModal} = this.props
        let productsByArtisan = products.filter(product => product.artist === artist)

        return(
            <React.Fragment>
                <Hero pageName={artist}/>
                    <div className="py-5">
                        <Container>
                            <Row>
                                {   productsByArtisan.map(product => {
                                    return <Product 
                                    key={product.product_id}
                                    product={product}
                                    inCart={cart === null ? false : cart.find(cartItem => cartItem.product_id === product.product_id) === undefined ? false : true}
                                    isLoggedIn={isLoggedIn}
                                    addToCartAndOpenModal={addToCartAndOpenModal}
                                    handleDetail={handleDetail}/>
                                })}
                            </Row>
                        </Container>
                    </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Artisan);