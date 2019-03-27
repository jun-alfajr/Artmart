import React, { Component } from 'react'
import styled from 'styled-components'
import {ProductConsumer} from '../context';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';

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
                            <div className="container">
                                <div className="row">
                                    <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center p-5">
                                        <h4 className="mb-5"><strong>Added to Cart</strong></h4>
                                        <img style={{maxHeight:200}} src={img} 
                                        className="img-fluid" 
                                        alt="product" />
                                        <h5 className="m-3 text-capitalize">{title}</h5>
                                        <h5 className="m-3">price : ${price}</h5>
                                            <ButtonContainer onClick={() => closeModal()}>
                                                continue
                                            </ButtonContainer>
                                        <Link to="/my-cart">
                                            <ButtonContainer cart onClick={() => closeModal()}>
                                                go to cart
                                            </ButtonContainer>
                                        </Link>
                                    </div>
                                </div>
                            </div>
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
    background: var(--mainWhite);
}
`