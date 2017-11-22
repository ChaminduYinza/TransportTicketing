/**
 * Created by Sameera on 5/2/2017.
 */
'use strict'

var mongoose = require('mongoose');


//create schema for prescriptions

var prescriptionSchema = mongoose.Schema({
    PrescriptionID:{
        type : String,
        required : true
    },
    CreatedDate:{
        type: String,
        required: true
    },
    PrescriptionDate:{
        type : String,
        required : true
    },
    PatientID:{
        type:String,
        required: true
    },
    PatientName:{
        type:String,
        required: true
    },
    PrescriptionStatus:{
        type : String,
        require : true
    }
});


var pres = module.exports = mongoose.model('prescriptions',prescriptionSchema);

//get prescriptions
module.exports.getPrescriptions = function (callback, limit) {
    pres.find(callback).limit(limit);
}


//add prescription
module.exports.addPrescription = function( prescription ,callback){
    pres.create(prescription , callback);
}

//upadate prescription
module.exports.updatePrescription = function( id, prescription, options ,callback){
    var query = {_id:id};
    var update = {
        CreatedDate : prescription.CreatedDate,
        PrescriptionDate : prescription.PrescriptionDate,
        PatientName: prescription.PatientName,
        PrescriptionStatus : prescription.PrescriptionStatus
    }
    pres.findOneAndUpdate(query, update, options , callback);
}