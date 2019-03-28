var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/addtocart', function (req, res, next) {
    console.log(req.body)

    let title = req.body.title
    let img = req.body.img
    let price = req.body.priceProduct
    let company = req.body.company
    let info = req.body.info
    let total = req.body.total
    let product_type = req.body.product_type
    let user_id = req.body.user_id

    db.one('INSERT INTO cartproducts(title, img, price, company, info, total, product_type, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING product_id', 
    [title, img, price, company, info, total, product_type, user_id])
      .then(function (data) {
            console.log("data");
          console.log(data);
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

router.put('/addone', function (req, res, next) {
    console.log(req.body) 
    let total = req.body.total;
    let user_id = req.body.user_id;
    let product_id = req.body.product_id;
    db.none('UPDATE cartproducts SET total = $1 WHERE product_id = $2 AND user_id = $3', [total, product_id, user_id])   
      .then(() => {
          console.log("product decresed"); 
          res.send('success')
      })
      .catch(function (error) {
          console.log('ERROR:', error); // print error;
          res.status(400).send(error) 
          
      });
    });
router.put('/minusone', function (req, res, next) {
                console.log(req.body) 
                let total = req.body.total;
                let user_id = req.body.user_id;
                let product_id = req.body.product_id;
                db.none('UPDATE cartproducts SET total = $1 WHERE product_id = $2 AND user_id = $3', [total, product_id, user_id])   
                  .then(() => {
                      console.log("product decresed"); 
                      res.send('success')
                  })
                  .catch(function (error) {
                      console.log('ERROR:', error); // print error;
                      res.status(400).send(error) 
                      
                  });
            });

router.delete('/delete/:title', function (req, res, next) {
        
        console.log(req.params)
       let title = req.param.title
        db.none('DELETE FROM cartproducts WHERE title = $1 AND user_id = $2', [title, 20])   
          .then(() => {
              console.log("product delete"); 
              res.send('success')
          })
          .catch(function (error) {
              console.log('ERROR:', error); // print error;
              res.status(400).send(error) 
              
          });
    });

router.delete('/delete/all', function (req, res, next) {
        
        console.log(req.params)
    //    let user = req.param.user_id
        db.none('DELETE FROM cartproducts WHERE user_id = $1', 20)   
          .then((result) => {
              console.log(result);
              console.log("deleted all produccts"); 
              console.log(result.rowCount);
              res.send('success')
          })
          .catch(function (error) {
              console.log('ERROR:', error); // print error;
              res.status(400).send(error) 
              
          });
});

module.exports = router;

// add product to cart
// router.post('/addtocart', function (req, res, next) {
//         console.log(req.body) 
//         let incart = req.body.incart
//         let product_id=req.body.product_id
//        console.log(incart);
//         db.none('UPDATE products SET incart = $1 WHERE product_id = $2', [incart, product_id])   
//           .then(() => {
//               console.log("product added"); 
//               res.send('success')
//           })
//           .catch(function (error) {
//               console.log('ERROR:', error); // print error;
//               res.status(400).send(error) 
              
//           });
//     });