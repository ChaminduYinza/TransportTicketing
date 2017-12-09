var mongoose = require('mongoose');

//user Schema

var UserSchema = mongoose.Schema({

    PID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: [{
        no: Number,
        street: String,
        city: String
    }],

    phoneNo: [{
        type: Number,
         required: true

    }],
    //default: Date.now
    email: {
        type: String,
        required: true

    },
    user_type:{
        type:String,
         required: true
    }

});

var User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUsers = function(callback, limit) {
    User.find(callback).limit(limit);

}

module.exports.validateLogin = function(PID, callback) {

    User.find({
        PID: PID
    }, callback);

}

module.exports.addUser = function(user, callback) {
    User.create(user, callback);

}



module.exports.getLastPID = function(callback) {
    User.find(callback).sort({
        $natural: -1
    }).limit(1);
}