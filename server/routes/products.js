var express = require('express');
var router = express.Router();
var db = require('../db');



// add product to cart
router.post('/addtocart', function (req, res, next) {
        console.log(req.body) 
        let incart = req.body.incart
        let product_id=req.body.product_id
       console.log(incart);
        db.none('UPDATE products SET incart = $1 WHERE product_id = $2', [incart, product_id])   
          .then(() => {
              console.log("product added"); 
              res.send('success')
          })
          .catch(function (error) {
              console.log('ERROR:', error); // print error;
              res.status(400).send(error) 
              
          });
    });

// router.post('/addtocart', function (req, res, next) {
//     console.log(req.body) 
//     let total = req.body.total
//     let count_of_items = req.body.amount
//     let users_id= req.body.amount  
//   db.one('INSERT INTO carts(total, count_of_items, users_id) VALUES($1, $2, $3) RETURNING cart_id', 
//               [total, count_of_items, users_id])   
//       .then(function (data) {
//         console.log("data");
//           console.log(data);
//              return 
//       })
//       .then(() => {
//           console.log("cart added"); 
//           res.send('success')
//       })
//       .catch(function (error) {
//           console.log('ERROR:', error); // print error;
//           res.status(400).send(error)
          
//       });
// });

module.exports = router;

