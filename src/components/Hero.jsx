import React from 'react';
import {Container, Jumbotron} from 'react-bootstrap';

const Hero = ({pageName}) => {
  return (
    <Jumbotron fluid>
            <Container>
                <h1 style={{textTransform:"capitalize"}}>{pageName}</h1>
            </Container>
    </Jumbotron>
  )
}

export default Hero;
