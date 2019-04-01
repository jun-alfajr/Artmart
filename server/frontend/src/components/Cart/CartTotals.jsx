import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Paypal from './PaypalButton';
import {Row,Col} from 'react-bootstrap';

class CartTotals extends Component{

    render(){

    let {cartSubTotal, cartTax, cartTotal, clearCart } = this.props

    return (
        <React.Fragment>
            <div className="m-5">
                <Row>
                    <Col className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <Link to="/">
                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" 
                            type="button"
                            onClick={() => clearCart()}>clear cart</button>
                        </Link>
                            <h5>subtotal : ${cartSubTotal}</h5>
                            <h5>tax : ${cartTax}</h5>
                            <h5><strong>total : ${cartTotal}</strong></h5>
                        <Paypal total=
                            {cartTotal} 
                            clearCart = {clearCart}/>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
    }
}

export default CartTotals;