
'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelBusRoutes = require('../models/busRoute.model');

router.use(bodyParser.json());

router.get('/api/busRoutes', function (req, res) {
    modelBusRoutes.getBatchs(function (err, busRouteObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(busRouteObj);
    });
});