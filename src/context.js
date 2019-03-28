import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';
import axios from 'axios';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state={
        products:[],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct : detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
        isLoggedIn:false,
        userId: null,
        // cartItems:[]
    }

    componentDidMount(){
        this.setProducts();
        this.checkStatus();
        axios.get('/cart/incart')
            .then(resp =>{
                console.log(resp.data)
                this.setState(() => {
                    return {cart:resp.data}
                })
            })
            .catch(err => console.log(err))
    }
checkStatus(){
         axios.get('/users/status')
        .then(resp =>{
            console.log(resp.data)
                this.setState(() => {
                    return {isLoggedIn:resp.data.isLoggedIn,
                    userId:resp.data.user_id}
                })
            })
        .catch(err => console.log(err))
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

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem]
        });
        this.setState(() => {
            return {products:this.shuffle(tempProducts)}
        })
        };

    getItem = (id) => {
        const product = this.state.products.find(item => item.product_id === id)
        return product;
    }

    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
    }
    
    addToCart = (id) =>{
        let tempProducts = [...this.state.products];
        console.log(tempProducts);
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
       
        const currentTitle = product.title;
        const currentImg = product.img;
        const price = product.price;
        const artist = product.artist;
        const currentInfo = product.info;
        const currentProductType = product.product_type;
        const currentTotal = product.total+1;
        
        const currentUserID = this.state.userId;
        console.log(currentUserID);
       
        product.total = price;

        this.setState(()=>{
            return {products: tempProducts, cart:[...this.state.cart,
            product]};
        },()=>{
            this.addTotals();
            }
        )
        let title = currentTitle
        let img = currentImg
        let priceProduct = price
        let company = artist
        let info = currentInfo
        let total = currentTotal
        let product_type = currentProductType
        let user_id = currentUserID
        axios.post('/cartproducts/addtocart', {
            title,
            img,
            priceProduct,
            company,
            info,
            total,
            product_type,
            user_id
            })
          .then((response) => {console.log(response)})
          .catch((err)=> console.log(err));
    }

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProduct: product, modalOpen: true}
        })
    }

    closeModal = () => {
        this.setState(() => {
            return {modalOpen:false}
        })
    }

    increment = (id) => {
        // console.log()
        // let tempCart = [...this.state.cartItems];
        // const selectedProduct = tempCart.find(item => item.product_id === id)
        // const index = tempCart.indexOf(selectedProduct);
        // const product = tempCart[index];
        // product.total = product.total + 1;
        // product.total = product.count * product.price;
        // this.setState(() => {
        //     return{
        //         cart:[...tempCart]}
        //     },()=>{this.addTotals()})
        //     let total = 0;
        let total = 2;
        let product_id = "77";
        let user_id = 20;
        axios.put('/cartproducts/addone', {
        total, product_id, user_id})
          .then((response) => {console.log(response)})
          .catch((err)=> console.log(err));
        
    }

    decrement = (id) => {
        // let tempCart = [...this.state.cart];
        // const selectedProduct = tempCart.find(item => item.product_id === id)
        // const index = tempCart.indexOf(selectedProduct);
        // const product = tempCart[index];

        // product.count = product.count -1;
        // if(product.count === 0){
        //     this.removeItem(id)
        // }else{
        //     product.total = product.count * product.price;
        //     this.setState(() => {
        //         return{
        //             cart:[...tempCart]}
        //         },()=>{this.addTotals()})
        // }
        let total = 0;
        let product_id = "77";
        let user_id = 20;
        axios.put('/cartproducts/minusone', {
        total, product_id, user_id})
          .then((response) => {console.log(response)})
          .catch((err)=> console.log(err));

    }

    removeItem = (id) => {
        console.log(tempProducts);
       let tempProducts = [...this.state.products];
       console.log(tempProducts)
       let tempCart = [...this.state.cart];

       tempCart = tempCart.filter(item => item.product_id !== id);
       const index = tempProducts.indexOf(this.getItem(id));
       let removedProduct = tempProducts[index];
       removedProduct.inCart = false;
       removedProduct.count = 0;
       removedProduct.total = 0;

       this.setState(() => {
           return {
           cart:[...tempCart],
           products:[...tempProducts]
           }
        },()=> {
           this.addTotals()
       })
    let title = "hand painted mug"
    axios.delete('/cartproducts/delete/${title}', {title})
      .then((response) => {
          console.log(response)
          alert("Item removed")
        })
      .catch((err)=> console.log(err));

    }

    clearCart = () => {
        this.setState(() => {
            return {cart: []}
        },() => {
        this.setProducts();
        this.addTotals()
        })
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => subTotal += item.total)
        const tempTax = subTotal * 0.07;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return{
            cartSubTotal:subTotal,
            cartTax:tax,
            cartTotal:total
            }
        })
    }

    render(){
    return (
        <ProductContext.Provider value={{
            ...this.state,
            handleDetail: this.handleDetail,
            addToCart: this.addToCart,
            openModal: this.openModal,
            closeModal: this.closeModal,
            increment: this.increment,
            decrement: this.decrement,
            removeItem:this.removeItem,
            clearCart:this.clearCart}}>
            {this.props.children}
        </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };