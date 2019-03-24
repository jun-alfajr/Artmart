import React, {Component} from 'react';
import Product from './Product';
import Hero from './Hero';
import {ProductConsumer} from '../context';

export default class ProductList extends Component{

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
        
        let selectedProductType = this.props.match.params.productType;

        return(
            <React.Fragment>
                <Hero pageName={selectedProductType}/>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <ProductConsumer>
                                { value => selectedProductType === "all" ? this.shuffle(value.products.map(product => {
                                        return <Product key={product.product_id}
                                        product={product}/> }))
                                        :
                                        value.products.filter(product => product.product_type === selectedProductType)
                                        .map(product => {return <Product key={product.product_id}product={product}/>
                                })}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}