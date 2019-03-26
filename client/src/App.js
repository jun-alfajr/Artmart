import React, { Component } from 'react';
import NavBar from './components/nav.jsx';
import Slides from './components/slides.jsx';
import Footer from './components/footer.jsx';
import Page from './components/page.jsx';
import {Switch, Route} from 'react-router-dom';
import Cart from './components/cartTest.jsx';
import Products from './components/productsTest.jsx';
import SignUp from './components/sign-up.jsx';

class App extends Component {
  render() {
    return (
      <div>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Slides}/>
        <Route exact path="/sign-up" component={SignUp}/>
        {/* <Route exact path="/cart" component={Cart} />
        <Route exact path="/products" component={Products} /> */}
        
      </Switch>
      <Footer/>
      </div>
    );
  }
}

export default App;
