import React, { Component } from 'react';
import NavBar from './components/Nav.jsx';
import Slides from './components/Slides.jsx';
import Footer from './components/Footer.jsx';
import {Switch, Route} from 'react-router-dom';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Default from './components/Default';
import Cart from './components/Cart/Cart.jsx';
import Modal from './components/Modal';
import SignUp from './components/Sign-up.jsx';
import LogIn from './components/Log-in.jsx';
import Artisan from './components/Artisan.jsx';
import About from './components/About';
import Terms from './components/Terms';
import Shipping from './components/Shipping.jsx';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
          <Switch>
            <Route exact path="/" component={Slides}/>
            <Route path="/log-in" component={LogIn}/>
            <Route path="/sign-up" component={SignUp}/>
            <Route path="/products/:productType" component={ProductList}/>
            <Route path="/artisans/:artisan" component={Artisan}/>
            <Route path="/details" component={Details}/>
            <Route path="/my-cart" component={Cart}/>
            <Route path="/about-us" component={About}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/shipping-rates" component={Shipping}/>
            <Route component={Default}/>
          </Switch>
        <Footer/>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
