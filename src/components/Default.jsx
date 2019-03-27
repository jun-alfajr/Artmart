import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
export default class Default extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col  style={{height: 400}} className="text-center m-5">
          <div style={{height:100}}></div>
            <h1>404</h1>
            <h2>Sorry,</h2>
            <h2>We couldn't find <span className="text-danger">{this.props.location.pathname}</span> </h2>
          </Col>
        </Row>
      </Container>
    )
  }
}