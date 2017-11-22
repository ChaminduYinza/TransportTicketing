var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt'); //for encrypting passwords

var PatientSchema = new Schema({
    PatientID:{
        type: String,
        require: true,
        default:0
    },
    PatientName: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: String,
        required: true
    },
    ContactNumber: {
        type: String,
        required: true
    },
    CreatedDate: {
        type: Date,
        required: true
    }

});

const Patient = mongoose.model('patient', PatientSchema);

//get prescriptions
module.exports.getPatient = function (callback, limit) {
    Patient.find(callback).limit(limit);
}

//add prescription
module.exports.addPatient = function( patient ,callback){
    var date = new Date();
    patient.CreatedDate = date.toLocaleDateString()+" "+date.toLocaleTimeString();
    Patient.create(patient , callback);
}

//upadate prescription
module.exports.updatePatient = function( patientID, patient, options ,callback){
    var query = {PatientID:patientID};

    var update = {
        PatientName: patient.PatientName,
        DateOfBirth: patient.DateOfBirth,
        ContactNumber: patient.ContactNumber,
        CreatedDate:patient.CreatedDate
    }
    Patient.findOneAndUpdate(query, update, options, callback);
}


//get last patient id
module.exports.getLastPatientId = function (callback) {
    Patient.find(callback).sort({$natural:-1}).limit(1);
}


//get patient by patient Name
module.exports.getPatientByName = function (patientName, callback) {
    Patient.find({PatientName: patientName},callback);
}


//delete patient by id
module.exports.deletePatient = function(patientId,callback){
    var query = {PatientID: patientId}
    Patient.remove(query,callback);

}