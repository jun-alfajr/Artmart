import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default function EmptyCart() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
            <h3>Cart is empty</h3>
            <img className="mb-5 img-fluid" 
            src="/img/empty_cart.png" 
            alt="empty cart"
            style={{maxHeight: 400}}/>
        </Col>
      </Row>
    </Container>
  )
}