var mongoose = require('mongoose');

//Journey Schema

var JourneySchema = mongoose.Schema({

    jid: {
        type: String,
        required: true
    },
    pid: {
        type: String,
        required: true
    },
    start_point: {
        type: String,
        required: true
    },
    end_point: {
        type: String,
        default: ""
    },
    isTravelling: {
        type: Boolean,
        default: true
    }

});

var Journey = module.exports = mongoose.model('Journey', JourneySchema);
//---------------------------------------------------Get all journey from db-----------------------------
module.exports.getAllJourney = function(callback, limit) {
    Journey.find(callback).limit(limit);

}

//---------------------------------------------------Validate whether user is travelling or not-----------------------------
module.exports.isJourneyAvailable = function(pid, callback) {

    Journey.find({
        pid: pid,
        isTravelling: true
    }, callback);


}
//---------------------------------------------------Get last journey id inorder to auto generate jid-----------------------------
module.exports.getLastJourneyId = function(callback) {
    Journey.find(callback).sort({
        $natural: -1
    }).limit(1);
}

//---------------------------------------------------add  journey-----------------------------
module.exports.setJourney = function(journey, callback) {
    Journey.create(journey, callback);

}


//---------------------------------------------------Get start point of a curreny journey for a given user-----------------------------
module.exports.getStartPoint = function(pid, callback) {

    Journey.find({
        pid: pid,
        isTravelling: true
    }, callback);


}
//---------------------------------------------------update journey flags-----------------------------
module.exports.updateJourney = function(jid, end_point, options, callback) {
    var query = {
        jid: jid
    }
    var update = {
        end_point: end_point,
        isTravelling: false
    }
    Journey.findOneAndUpdate(query, update, options, callback);

}