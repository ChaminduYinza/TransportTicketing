var mongoose = require('mongoose');

//payment Schema

var PaymentSchema = mongoose.Schema({

    payid: {
        type: String,
        required: true
    },
    jid: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    payment_type: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }

});

var Payment = module.exports = mongoose.model('Payment', PaymentSchema);


module.exports.getAllPayment = function(callback, limit) {
    Payment.find(callback).limit(limit);

}
module.exports.addPayment = function(payment, callback) {
    Payment.create(payment, callback);

}

module.exports.getLastPayId = function(callback) {
    Payment.find(callback).sort({
        $natural: -1
    }).limit(1);
}