var express = require('express');
var router = express.Router();
var db = require('../db');
var bcrypt = require('bcryptjs');
var passport = require('../passport.js');





// // CHECK STATUS
// router.get('/products', function (req, res, next) {
//   if (req.user) {
//       res.send({ username: req.user.username, isLoggedIn: true})
//   } else {
//       res.send({ username: null, isLoggedIn: false })
//   }
// });

// REGISTER USER, Email, and Address
router.post('/addtocart', function (req, res, next) {
    console.log(req.body) 
    let total = req.body.total
    let count_of_items = req.body.amount
    let users_id= 1    
  db.one('INSERT INTO carts(total, count_of_items, users_id) VALUES($1, $2, $3) RETURNING cart_id', 
              [total, count_of_items, users_id])   
      .then(function (data) {
        console.log("data");
          console.log(data);
             return 
      })
      .then(() => {
          console.log("cart added"); 
          res.send('success')
      })
      .catch(function (error) {
          console.log('ERROR:', error); // print error;
          res.status(400).send(error)
          
      });
});

module.exports = router;

