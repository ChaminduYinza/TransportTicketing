var mongoose = require('mongoose');

//Journey Schema

var RouteSchema = mongoose.Schema({

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
    bus_route: {
        type: String,
        required: true
    }

});

var Route = module.exports = mongoose.model('Route', RouteSchema)


module.exports.getAllRoutes = function(callback, limit) {
    Route.find(callback).limit(limit);

}


module.exports.getEndPoint = function(route_no, callback) {

    Route.find({
        route_no: route_no
    }, callback);

}


module.exports.addRoute = function(route, callback) {
    Route.create(route, callback);
}


module.exports.getLastRouteID = function(callback) {
    Route.find(callback).sort({
        $natural: -1
    }).limit(1);
}