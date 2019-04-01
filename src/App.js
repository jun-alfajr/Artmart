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
    isLoggedIn : false,
    cart : [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  }

  componentDidMount(){
    this.getUser();
  }

  getUser(){
    axios.get('/getUser')
    .then(res => res.data === false ?
    this.setState({isLoggedIn : false}) :
    this.setState({isLoggedIn: true}, this.getAllProducts(), this.addTotals()))
    .catch(err => console.log(err))
  }

  addTotals = () => {

    axios.get("/getCartTotal").
    then(res => {
      console.log(res)
      let subTotal = res.data
      let tempTax = subTotal * 0.07;
      let tax = parseFloat(tempTax.toFixed(2));
      let total = subTotal + tax

      this.setState({cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total})})
    .catch(err => console.log(err))

    // console.log('add totals invoked')
    // console.log(this.state.cart)
    // let subTotal = 0;
    // this.state.cart.map(item => subTotal += item.total)
    // const tempTax = subTotal * 0.07;
    // const tax = parseFloat(tempTax.toFixed(2));
    // const total = subTotal + tax;
    // console.log(`subTotal: ${subTotal}`)
    // console.log(`tax: ${tax}`)
    // console.log(`total: ${total}`)

    // this.setState(()=>{
    //     return{
    //     cartSubTotal:subTotal,
    //     cartTax:tax,
    //     cartTotal:total
    //     }
    // })
}

      getAllProducts(){
        console.log('get all products invoked');
        axios.get("/getCart")
        .then(res => {
          console.log(res);
          this.setState({cart: res.data})})
        .catch(err => console.log(err))
    }

  render() {
    let {isLoggedIn, cart} = this.state 
    return (
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn}/>
          <Switch>
            <Route exact path="/" component={Slides}/>
            <Route path="/log-in" render={()=> <LogIn isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route path="/sign-up" render={()=> <SignUp isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route path="/products/:productType" render={()=> <ProductList cart={cart} getAllProducts={()=> this.getAllProducts()} isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route path="/artisans/:artisan" render={()=> <Artisan cart={cart} getAllProducts={()=> this.getAllProducts()} isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route path="/details" render={() => <Details cart={cart} isLoggedIn={isLoggedIn}/>}/>
            <Route path="/my-cart" render={()=><Cart {...this.state}/>}/>
            <Route path="/about-us" component={About}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/shipping-rates" component={Shipping}/>
            <Route path="/log-out" render={()=> <LogOut isLoggedIn={isLoggedIn} getUser={()=>this.getUser()}/>}/>
            <Route component={Default}/>
          </Switch>
        <Footer/>
        <Modal getAllProducts={()=>this.getAllProducts()}/>
      </React.Fragment>
    );
  }
}

export default App;
