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
import LogOut from './components/Log-out';
import axios from 'axios';
class App extends Component {
  state = {
    isLoggedIn : false
  }

  componentDidMount(){
    this.getUser();
  }

  getUser(){
    axios.get('/getUser')
    .then(res => res.data === false ? 
    this.setState({isLoggedIn : false}) :
    this.setState({isLoggedIn: true}))
  }

  render() {
    let {isLoggedIn} = this.state 
    return (
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn}/>
          <Switch>
            <Route exact path="/" component={Slides}/>
            <Route path="/log-in" render={()=> <LogIn isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route path="/sign-up" render={()=> <SignUp isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route path="/products/:productType" render={()=> <ProductList isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route path="/artisans/:artisan" render={()=> <Artisan isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route path="/details" render={() => <Details isLoggedIn={isLoggedIn}/>}/>
            <Route path="/my-cart" render={()=><Cart isLoggedIn={isLoggedIn}/>}/>
            <Route path="/about-us" component={About}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/shipping-rates" component={Shipping}/>
            <Route path="/log-out" render={()=> <LogOut isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route component={Default}/>
          </Switch>
        <Footer/>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
