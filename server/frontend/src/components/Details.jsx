
import React, { Component } from 'react'
import {ButtonContainer} from './Button';
import Hero from './Hero';
import {withRouter} from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap';

class Details extends Component {

  render() {
    let {isLoggedIn,cart,detailProduct, addToCartAndOpenModal} = this.props;
    let {product_id,title,artist,img,price,info} = detailProduct;
    let inCart = false;

    if(cart !== null){
    inCart = cart.find(cartItem => cartItem.product_id === product_id) === undefined ? false : true
    }
    
      return(
      <React.Fragment>
        <Hero pageName={title}/>
          <Container className="py-5">
              <Row>
                <Col className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid img-responsive" alt="product"/>
                </Col>
                <div className="col-10 mx-auto col-md-6 my-3">
                  <h4><strong>Price: <span>$</span>{price}</strong></h4>
                  <h4 className="mt-3 mb-2">
                    Artist: <span >{artist}</span>
                  </h4>
                  <p className="text-muted lead">
                    {info}
                  </p>
                    <div>
                      <ButtonContainer onClick={()=>this.props.history.goBack()}>
                        back to products
                      </ButtonContainer>
                      <ButtonContainer
                        cart
                        disabled={inCart ? true : false}
                        onClick={()=>{ isLoggedIn ?
                          addToCartAndOpenModal(product_id) :
                          this.props.history.push("/log-in");
                        }}>
                        {inCart ? "inCart" : "add to cart"}
                      </ButtonContainer>
                    </div>
                  </div>
              </Row>
          </Container>
      </React.Fragment>
    )
  }
}


export default withRouter(Details);