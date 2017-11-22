/**
 * Created by Sameera on 5/2/2017.
 */
'use strict'

var mongoose = require('mongoose');


//create schema for Payments

var paymentSchema = mongoose.Schema({
    PatientID:{
        type : String,
        required : true
    },
    PatientName:{
        type: String,
        required: true
    },
    PrescriptionID:{
        type : String,
        required : true
    },
    Amount:{
        type : String,
        required : true
    },
    PaymentStatus:{
        type : String,
        required : true
    }
});


var Payments = module.exports = mongoose.model('prescriptionpayments',paymentSchema);

//get Payments

module.exports.getPayments = function (callback, limit) {
    Payments.find(callback).limit(limit);
}

//add Payments

module.exports.addPayment = function( Payment ,callback){
    Payments.create(Payment , callback);
}
