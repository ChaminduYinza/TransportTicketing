'user strict'

var cors=require('cors');
var mongoose = require('mongoose');

var express = require('express');
var config = require('./config/config');
var personRoute = require('./routes/UserRoutes')


var server = express();
const server_port = config.web_port;
server.use(cors());
server.use(personRoute);
server.use(express.static(__dirname));

mongoose.connect('mongodb://localhost:27017/PharmacySystem');
var database = mongoose.connection;


server.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(server_port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('server listening on port : '+server_port);
});


