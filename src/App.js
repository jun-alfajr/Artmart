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
import {storeProducts, detailProduct} from './data';

class App extends Component {
  state = {
    products:[],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct : detailProduct,
    cartSubTotal:0,
    cartTax:0,
    cartTotal:0,
    isLoggedIn:false
  }


  componentDidMount(){
    this.setProducts()
    this.getUser();
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  return array;
}

  getItem(id){
    const product = this.state.products.find(item => item.product_id === id)
    return product;
  }

  addToCart(id){
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id))
    const product = tempProducts[index];
    const price = product.price;
    product.total = price;
    product.count = 1;

    axios.post("/addToCart",product)
    .then(res => {
      console.log(res);
      this.addTotals()})
    .catch(err => console.log(err))
  }

  openModal(id){
    const product = this.getItem(id);
    this.setState({modalProduct: product, modalOpen: true})
  }

  addToCartAndOpenModal(id){
    this.addToCart(id);
    this.openModal(id);
    this.getAllProducts()
  }

  closeModal(){
    this.setState(() => {
        return {modalOpen:false}
    })
  }

  setProducts(){
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = {...item};
      tempProducts = [...tempProducts,singleItem]
    });
    this.setState({products:this.shuffle(tempProducts)})
  };

  getUser(){
    axios.get('/getUser')
    .then(res => res.data === false ?
      this.setState({isLoggedIn : false}) :
      this.setState({isLoggedIn: true}, 
      this.getAllProducts(), this.addTotals()))
    .catch(err => console.log(err))
  }

  addTotals(){
    axios.get("/getCartTotal")
    .then(res => {
      console.log(res)
      let subTotal = res.data
      let tempTax = subTotal * 0.07;
      let tax = parseFloat(tempTax.toFixed(2));
      let total = subTotal + tax
      this.setState({cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total})})
    .catch(err => console.log(err))
  }

  increment(id){
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.product_id === id)
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    axios.post("/updateProductCount", product)
    .then(res => {
      console.log(res.data);
      this.setState({ cart:[...tempCart]},
      this.addTotals())})
    .catch(err => console.log(err))
  }

  handleDetail(id){
      const product = this.getItem(id);
      this.setState({detailProduct:product})
  }

  decrement(id){
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.product_id === id)
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count -1;
    product.total = product.count * product.price;

    if(product.count === 0){
      this.removeItem(id)
      }else{

    axios.post("/updateProductCount", product)
    .then(res => {
      console.log(res.data);
      this.setState({ cart:[...tempCart]},this.addTotals())})
    .catch(err => console.log(err))
    }
  }

  removeItem(id){
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.product_id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    axios.post("/removeProduct",removedProduct)
    .then(res => {
      console.log(res);
      this.setState({ cart:[...tempCart]},this.addTotals())
    }).catch(err => console.log(err))
  }

  getAllProducts(){
    axios.get("/getCart")
    .then(res => {
      console.log(res);
      this.setState({cart: res.data})})
    .catch(err => console.log(err))
  }

  clearCart(){
    axios.post("/clearCart")
    .then(res => {
      console.log(res);
      this.setState({cart: []},this.addTotals())})
    .catch(err => console.log(err))
  }

  render() {
    let {isLoggedIn, cart, products, detailProduct, modalOpen, modalProduct} = this.state 
    return (
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn}/>
          <Switch>
            <Route exact path="/" component={Slides}/>
            <Route path="/log-in" render={()=> 
              <LogIn  isLoggedIn={isLoggedIn} 
                      getUser={()=>this.getUser()}/>}/>
            <Route path="/sign-up" render={()=> 
              <SignUp isLoggedIn={isLoggedIn} 
                      getUser={()=>this.getUser()}/>}/>
            <Route path="/products/:productType" render={()=> 
              <ProductList  cart={cart} 
                            isLoggedIn={isLoggedIn} 
                            getUser={()=>this.getUser()} 
                            handleDetail={(id)=>this.handleDetail(id)}  
                            addToCartAndOpenModal={(id)=>this.addToCartAndOpenModal(id)} 
                            products={products}/>}/>
            <Route path="/artisans/:artisan" render={()=> 
              <Artisan  cart={cart} 
                        isLoggedIn={isLoggedIn} 
                        getUser={()=>this.getUser()} 
                        products={products} 
                        addToCartAndOpenModal={(id)=>this.addToCartAndOpenModal(id)} 
                        handleDetail={(id)=>this.handleDetail(id)}/>}/>
            <Route path="/details" render={() => 
              <Details  cart={cart} 
                        isLoggedIn={isLoggedIn} detailProduct={detailProduct} addToCartAndOpenModal={(id)=>this.addToCartAndOpenModal(id)}/>}/>
            <Route path="/my-cart" render={()=> 
              <Cart {...this.state} 
                    increment={(id) => this.increment(id)} 
                    decrement={(id) => this.decrement(id)} 
                    removeItem={(id)=>this.removeItem(id)} 
                    clearCart={()=> this.clearCart()}/>}/>
            <Route path="/about-us" component={About}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/shipping-rates" component={Shipping}/>
            <Route path="/log-out" render={()=> 
              <LogOut isLoggedIn={isLoggedIn} 
                      getUser={()=>this.getUser()}/>}/>
            <Route component={Default}/>
          </Switch>
        <Footer/>
        <Modal  getAllProducts={()=>this.getAllProducts()} 
                modalOpen={modalOpen} closeModal={()=>this.closeModal()} 
                modalProduct={modalProduct}/>
      </React.Fragment>
    );
  }
}

export default App;
