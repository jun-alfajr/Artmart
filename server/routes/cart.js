var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/incart', function (req, res, next) {
    

        db.any('SELECT * FROM products WHERE incart = $1', [true])
            .then(function (data) {
                // success;
                console.log(data);
                res.json(data);
            })
            .catch(function (error) {
                // error;
                res.status(400).send(error)
            });
});


module.exports = router;

