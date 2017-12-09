var mongoose = require('mongoose');

//Journey Schema

var FareSchema = mongoose.Schema({

    route_no: {
        type: String,
        required: true
    },
    start_point: {
        type: String,
        required: true
    },
    end_point: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }

});

var Fare = module.exports = mongoose.model('Fare', FareSchema)

//---------------------------------------------------Get all fares from db-----------------------------
module.exports.getAllFares = function(callback, limit) {
    Fare.find(callback).limit(limit);

}

//---------------------------------------------------Get last fare id inorder to auto generate fid-----------------------------
module.exports.getLastFareID = function(callback) {
    Fare.find(callback).sort({
        $natural: -1
    }).limit(1);
}

//---------------------------------------------------Add fare-----------------------------
module.exports.addFare = function(route, callback) {
    Fare.create(route, callback);
}

//---------------------------------------------------get fare by provided values-----------------------------
module.exports.getFare = function(start_point, end_point, route_no, callback) {

    Fare.find({
        route_no: route_no,
        start_point: start_point,
        end_point: end_point
    }, callback);


}