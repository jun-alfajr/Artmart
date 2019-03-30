import React, {Component} from 'react';
import Product from './Product';
import Hero from './Hero';
import {ProductConsumer} from '../context';
import {withRouter} from 'react-router-dom';
class Artisan extends Component{

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
        
        return array;
        }
        render(){
        let artist = this.props.match.params.artisan.replace("-"," ").replace("-"," ");
        return(
            <React.Fragment>
                <Hero pageName={artist}/>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    let productsByArtisan = this.shuffle(value.products.filter(product => product.artist === artist))
                                    return productsByArtisan.map(product => {
                                        return <Product 
                                        key={product.product_id}
                                        product={product}
                                        isLoggedIn={this.props.isLoggedIn}/>
                                    })}}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Artisan);