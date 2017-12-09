'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelUser = require('../models/User');
var modelAccount = require('../models/Account');
var modelToken = require('../models/Token');
var modelRoute = require('../models/Route')
var modelFare = require('../models/Fare')
var modelPayment = require('../models/Payment')



router.use(bodyParser.json());


router.get('/api/payment', function(req, res) {
    modelPayment.getAllPayment(function(err, paymentDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        res.json(paymentDetails);

    });


});



module.exports = router;