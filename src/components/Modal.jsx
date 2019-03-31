import React, { Component } from 'react'
import styled from 'styled-components'
import {ProductConsumer} from '../context';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

export default class Modal extends Component {
  render() {
    return (
        <ProductConsumer>
            {(value) => {
                const {modalOpen,closeModal} = value;
                const{img,title,price} = value.modalProduct;
                if(!modalOpen){
                    return null;
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
                                        <Link to="/products/all" onClick={()=>this.props.getAllProducts()}>
                                            <ButtonContainer onClick={() => closeModal()}>
                                                continue
                                            </ButtonContainer>
                                        </Link>
                                        <Link to="/my-cart" onClick={this.props.getAllProducts()}>
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
                </ProductConsumer>
            )
        }
    }

const ModalContainer = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0,0,0,0.3);
display: flex;
align-items: center;
justify-content: center;
#modal{
    background: white;
}
`