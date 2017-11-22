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
    PatientName:{
        type : String,
        required: true
    },
    DoctorName:{
        type : String,
        required: true
    },
    CreatedDate:{
        type : String,
        required: true
    },
    PrescriptionDate:{
        type : String,
        required : true
    },
    Age:{
        type : Number,
        required: true
    },
    Reason:{
        type : String,
        required: true
    },
    PrescriptionStatus:{
        type : String,
        require : true,
        default : "Pending"
    }
});


var pres = module.exports = mongoose.model('prescriptions',prescriptionSchema);

//get prescriptions
module.exports.getPrescriptions = function (callback, limit) {
    pres.find(callback).limit(limit);
}


//add prescription
module.exports.addPrescription = function( prescription ,callback){
    var date = new Date();
    prescription.CreatedDate = date.toLocaleDateString()+" "+date.toLocaleTimeString();
    pres.create(prescription , callback);
}

//upadate prescription
module.exports.updatePrescription = function( PrescriptionID, prescription, options ,callback){
    var query = {PrescriptionID:PrescriptionID};
    var update = {
        PrescriptionDate : prescription.PrescriptionDate,
        PatientName : prescription.PatientName,
        DoctorName : prescription.DoctorName,
        Reason: prescription.Reason,
        Age: prescription.Age,
        PrescriptionStatus : prescription.PrescriptionStatus
    }
    pres.findOneAndUpdate(query, update, options , callback);
}

//get prescription by PrescriptionID
module.exports.getPrescriptionById = function (PrescriptionID, callback) {
    pres.find({PrescriptionID: PrescriptionID},callback);
}

//get prescription by status
module.exports.getPrescriptionByStatus = function (pressStatus, callback) {
    pres.find({PrescriptionStatus: pressStatus},callback);
}

//get last pres id
module.exports.getLastDispensePresId = function (callback) {
    pres.find(callback).sort({$natural:-1}).limit(1);
}

//delete dissDrug by id
module.exports.deletePress = function(pressId,callback){
    var query = {PrescriptionID: pressId}
    pres.remove(query,callback);

}