var mongoose = require('mongoose');

//Token Schema

var TokenSchema = mongoose.Schema({

    token_no: {
        type: String,
        required: true
    },
    qr_code: {
        type: String,
        required: true
    },
    bar_code: {
        type: String,
        required: true
    },
    account_no: {
        type: Number,
        required: true
    }

});

var Token = module.exports = mongoose.model('Token', TokenSchema);

module.exports.addToken = function(token, callback) {
    Token.create(token, callback);

}

module.exports.getLastTokenNumber = function(callback) {
    Token.find(callback).sort({
        $natural: -1
    }).limit(1);
}


module.exports.identifyToken = function(code, callback) {

    Token.find({
        token_no: code
    }, callback);

}