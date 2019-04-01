import React, { Component } from 'react'
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ModalContainer from './ModalContainer';

export default class Modal extends Component {

    render() {

    const {modalOpen,closeModal, modalProduct, getAllProducts} = this.props;
    let {img,title,price} = modalProduct;

    if(!modalOpen){
        return null
    }else{
        return(
        <ModalContainer>
            <Container>
                <Row>
                    <Col>
                        <div id="modal" 
                        style={{borderRadius:'4px', maxWidth: 400}} 
                        className="col-11 mx-auto col-md-6 col-lg-4 text-center p-5">
                            <h4 className="mb-5"><strong>Added to Cart</strong></h4>
                            <img style={{maxHeight:200}} 
                            src={img} 
                            className="img-fluid" 
                            alt="product" />
                            <h5 className="m-3 text-capitalize">{title}</h5>
                            <h5 className="m-3">price : ${price}</h5>
                            <Link to="/products/all" onClick={()=> getAllProducts()}>
                                <ButtonContainer onClick={() => closeModal()}>
                                    continue
                                </ButtonContainer>
                            </Link>
                            <Link to="/my-cart" onClick={ getAllProducts()}>
                                <ButtonContainer cart onClick={() => closeModal()}>
                                    go to cart
                                </ButtonContainer>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </ModalContainer>)
    }
}}
