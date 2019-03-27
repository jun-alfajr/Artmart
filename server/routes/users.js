var express = require('express');
var router = express.Router();
var db = require('../db');
var bcrypt = require('bcryptjs');
var passport = require('../passport.js');

///isAuthenticated is used to ask if user is logged in or not
function isAuthenticated(req,res,next){
  if(req.isAuthenticated(req)){
      console.log(req);
      next();
  }else{
      res.redirect("/");
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// LOG IN
router.post('/login', passport.authenticate('local'), function (req, res, next) {
  res.json({ username: req.user.username });
});
// LOG OUT
router.post('/logout', function (req, res, next) {
  req.logout();
  res.json({ status: 'OK' });
});

// CHECK STATUS
router.get('/status', function (req, res, next) {
  if (req.user) {
      res.send({ username: req.user.username, isLoggedIn: true})
  } else {
      res.send({ username: null, isLoggedIn: false })
  }
});

// REGISTER USER, Email, and Address
router.post('/register', function (req, res, next) {
    console.log(req.body)
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let address = req.body.address;
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zipcode;
  let picture = req.body.profilePic;

//   switch (false) {
//       case username:
//       res.status(400).send({
//           error: "please provide a username"
//       })
//       break;
//       case password:
//       res.status(400).send({
//           error: "please provide a password"
//       })
//       break;
//       case email:
//       res.status(400).send({
//           error: "please provide an email"
//       })
//       break;
//       case address:
//       res.status(400).send({
//           error: "please provide an address"
//       })
//       break;
//       case city:
//       res.status(400).send({
//           error: "please provide a city"
//       })
//       break;
//       case state:
//       res.status(400).send({
//           error: "please provide a state"
//       })
//       break;
//       case zip:
//       res.status(400).send({
//           error: "please provide a zipcode"
//       })
//       break;
//       default:
//       console.log("")
//   }

  if (!username || !password) {
      res.status(400).send({
          error: "error in filling out form"
      })
  }

  db.any('SELECT * FROM users WHERE username = $1', [username])
      .then(function (data) {
        console.log("data");
          console.log(data);
          if  ( data.length == 1) {
              // user already exists!
              res.status(400).send({error: "USER ALREADY EXISTS"});
          }     else {
              console.log(password)
              let hashedPassword = bcrypt.hashSync(password, 10);
              return db.one('INSERT INTO users(username, email, password, address, city, state, zip, profile_picture) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id', 
              [username, email, hashedPassword, address, city, state, zip, picture])   
          }    
      })
      .then(() => {
          console.log("SUCCESFULLY CREATED USER"); // print new user id;
          res.send('success')
      })
      .catch(function (error) {
          console.log('ERROR:', error); // print error;
          res.status(400).send(error)
          console.log(username);
      });
});

module.exports = router;

