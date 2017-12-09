'user strict'

var cors = require('cors');
var mongoose = require('mongoose');

var express = require('express');
var config = require('./config/config');
var databaseConnection = require('./config/database');
var userRoute = require('./routes/UserController')
var payStationRoute = require('./routes/AccountController')
var journeyRoute = require('./routes/JourneyController')
var busrouteRoute = require('./routes/RouteController')
var paymentRoute = require('./routes/PaymentController')
var fareRoute = require('./routes/FareController')

var server = express();
const server_port = config.web_port;
server.use(cors());
server.use(userRoute);
server.use(payStationRoute);
server.use(journeyRoute);
server.use(busrouteRoute);
server.use(paymentRoute);
server.use(fareRoute);
server.use(express.static(__dirname));

mongoose.connect(databaseConnection.ip);
var database = mongoose.connection;


server.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');

});

server.listen(server_port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('server listening on port : ' + server_port);
});

module.exports = server