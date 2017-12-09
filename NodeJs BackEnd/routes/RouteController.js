'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelUser = require('../models/User');
var modelAccount = require('../models/Account');
var modelToken = require('../models/Token');
var modelRoute = require('../models/Route')



router.use(bodyParser.json());

router.post('/api/route', function(req, res) {
    var routeDetails = req.body;


    modelRoute.getLastRouteID(function(err, lastRID) {
        if (err) {
            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        } else {

            if (lastRID.length > 0) {
                lastRID = lastRID[0].route_no.split("R")[1];
                lastRID = "R" + (parseInt(lastRID) + 1);
            } else {
                lastRID = "R1";
            }
            routeDetails[0].route_no = lastRID;
            addRoute();

        }
    })

    function addRoute() {

        modelRoute.addRoute(routeDetails, function(err, routeObj) {
            if (err) {

                res.json({
                    success: false,
                    msg: 'Post request Fail by route user!!'
                });
                return;
            }
            res.json(routeObj);

        });

    }




});


module.exports = router;