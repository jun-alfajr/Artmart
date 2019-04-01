// import React, { Component } from 'react';
// import {storeProducts, detailProduct} from './data';
// import axios from 'axios';

// const ProductContext = React.createContext();

// class ProductProvider extends Component {
//     state={
//         products:[],
//         detailProduct: detailProduct,
//         cart: [],
//         modalOpen: false,
//         modalProduct : detailProduct,
//         cartSubTotal:0,
//         cartTax:0,
//         cartTotal:0,
//         isLoggedIn:false
//     }

//     componentDidMount(){
//         this.setProducts();
//     }

//     shuffle(array) {
//         var currentIndex = array.length, temporaryValue, randomIndex;
//         while (0 !== currentIndex) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//         }
//         return array;
//     }

//     getUser = () => {
//         axios.get("/getCurrentUser")
//         .then(res => res.data === false ? 
//             this.setState({isLoggedIn : false}) : 
//             this.setState({isLoggedIn : true}))
//         .catch(err => console.log(err))
//     }

//     setProducts = () => {
//         let tempProducts = [];
//         storeProducts.forEach(item => {
//             const singleItem = {...item};
//             tempProducts = [...tempProducts,singleItem]
//         });
//         this.setState(() => {
//             return {products:this.shuffle(tempProducts)}
//         })
//         };

//     getItem = (id) => {
//         const product = this.state.products.find(item => item.product_id === id)
//         return product;
//     }

//     handleDetail = (id) =>{
//         const product = this.getItem(id);
//         this.setState(()=>{
//             return {detailProduct:product}
//         })
//     }

//     addToCart = (id) =>{
//         let tempProducts = [...this.state.products];
//         const index = tempProducts.indexOf(this.getItem(id))
//         const product = tempProducts[index];
//         const price = product.price;
//         product.total = price;
//         product.count = 1;

//         axios.post("/addToCart",product)
//         .then(res => console.log(res))
//         .catch(err => console.log(err))
//     }

//     openModal = (id) => {
//         const product = this.getItem(id);
//         this.setState(() => {
//             return {modalProduct: product, modalOpen: true}
//         })
//     }

//     addToCartAndOpenModal = (id) => {
//         this.addToCart(id);
//         this.openModal(id);
//     }

//     closeModal = () => {
//         this.setState(() => {
//             return {modalOpen:false}
//         })
//     }

//     getAllProducts(){
//     axios.get("/getCart")
//     .then(res => {
//     console.log(res);
//     this.setState({cart: res.data})})
//     .catch(err => console.log(err))
// }

//     increment = (id) => {
//         console.log()
//         let tempCart = [...this.state.cart];
//         const selectedProduct = tempCart.find(item => item.product_id === id)
//         const index = tempCart.indexOf(selectedProduct);
//         const product = tempCart[index];
//         product.count = product.count + 1;
//         product.total = product.count * product.price;
//         this.setState(() => {
//             return{
//                 cart:[...tempCart]}
//             },()=>{this.addTotals()})
//     }

//     decrement = (id) => {
//         let tempCart = [...this.state.cart];
//         const selectedProduct = tempCart.find(item => item.product_id === id)
//         const index = tempCart.indexOf(selectedProduct);
//         const product = tempCart[index];

//         product.count = product.count -1;
//         if(product.count === 0){
//             this.removeItem(id)
//         }else{
//             product.total = product.count * product.price;
//             this.setState(() => {
//                 return{
//                     cart:[...tempCart]}
//                 },()=>{this.addTotals()})
//         }
//     }
    
//     removeItem = (id) => {
//     let tempProducts = [...this.state.products];
//     let tempCart = [...this.state.cart];

//     tempCart = tempCart.filter(item => item.product_id !== id);
//     const index = tempProducts.indexOf(this.getItem(id));
//     let removedProduct = tempProducts[index];
//     removedProduct.inCart = false;
//     removedProduct.count = 0;
//     removedProduct.total = 0;

//     this.setState(() => {
//         return {
//         cart:[...tempCart],
//         products:[...tempProducts]
//         }
//         },()=> {
//         this.addTotals()
//     })
//     }

//     clearCart = () => {
//         this.setState(() => {
//             return {cart: []}
//         },() => {
//         this.setProducts();
//         this.addTotals()
//         })
//     }


//     render(){
//     return (
//         <ProductContext.Provider value={{
//             ...this.state,
//             handleDetail: this.handleDetail,
//             addToCart: this.addToCart,
//             getUser: this.getUser,
//             openModal: this.openModal,
//             addToCartAndOpenModal: this.addToCartAndOpenModal,
//             closeModal: this.closeModal,
//             increment: this.increment,
//             decrement: this.decrement,
//             removeItem:this.removeItem,
//             getAllProducts: this.getAllProducts,
//             clearCart:this.clearCart}}>
//             {this.props.children}
//         </ProductContext.Provider>
//         )
//     }
// }

// const ProductConsumer = ProductContext.Consumer;

// export { ProductProvider, ProductConsumer };