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
            <Route exact path="/log-in" component={LogIn}/>
            <Route exact path="/sign-up" component={SignUp}/>
            <Route exact path="/products/:productType" component={ProductList}/>
            <Route exact path="/artisans/:artisan" component={Artisan}/>
            <Route exact path="/details" component={Details}/>
            <Route exact path="/my-cart" component={Cart}/>
            <Route exact path="/about-us" component={About}/>
            <Route exact path="/terms" component={Terms}/>
            <Route exact path="/shipping-rates" component={Shipping}/>
          </Switch>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
