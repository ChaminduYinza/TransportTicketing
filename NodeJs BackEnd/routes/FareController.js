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



router.post('/api/getFare', function(req, res) {

    var journeyDetails = req.body;

    modelFare.getFare(journeyDetails[0].start_point, journeyDetails[0].end_point, journeyDetails[0].route_no, function(err, fareDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        if (fareDetails.length <= 0) {

            res.json({
                success: false,
                msg: 'Cannot find a fare for the given destination'
            });
            return;
        }
       
               res.json(fareDetails[0]);

    });
});

router.post('/api/addFare', function(req, res) {

    var journeyDetails = req.body;

    modelFare.addFare(journeyDetails, function(err, fareDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
       
               res.json(fareDetails[0]);

    });
});



module.exports = router;