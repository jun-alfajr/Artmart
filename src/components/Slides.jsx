import React, {Component} from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask} from "mdbreact";
import {slides} from '../data.js';

 class Slides extends Component{

   render(){
     let imgStyle= {marginTop : '-30%', maxHeight : '400'}
    return (
      <MDBCarousel  activeItem={1} length={2} showControls={false} showIndicators={true}>
      <div className="d-none d-sm-block">
        <MDBCarouselInner >
        {slides.map((slide,i) => 
        <MDBCarouselItem itemId={i+1} key={i}>
            <MDBView>
              <img style={imgStyle} className="d-block w-100" src={slide.img} alt="slide"/>
              <MDBMask overlay="black-light" />
            </MDBView>
            <MDBCarouselCaption style={{marginBottom: '10%'}}>
            <b>{slide.caption}</b>
            </MDBCarouselCaption>
          </MDBCarouselItem>)}
        </MDBCarouselInner>
        </div>
        <div className="d-block d-sm-none">
        <MDBCarouselInner >
        {slides.map((slide,i) => 
        <MDBCarouselItem itemId={i+1} key={i}>
            <MDBView>
              <img style={{height:360}} className="d-block w-100" src={slide.img} alt="slide"/>
              <MDBMask overlay="black-light" />
            </MDBView>
          </MDBCarouselItem>)}
        </MDBCarouselInner>
        </div>
      </MDBCarousel>
    );
  }
}

export default Slides;