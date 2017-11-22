/**
 * Created by Sameera on 6/30/2017.
 */

/**
 * Created by Sameera on 5/2/2017.
 */
'use strict'

var mongoose = require('mongoose');


//create schema for prescriptions

var doctors = mongoose.Schema({
    DoctorID:{
        type:String,
        required: true
    },
    DoctorName:{
        type:String,
        required: true
    },
    Specialization:{
        type:String,
        required: true
    },
    Hospital:{
        type: String,
        required: true
    },
    Contact:{
        type : String,
        required : true
    }
});

var doctor = module.exports = mongoose.model('doctors',doctors);

//get prescriptions
module.exports.getDoctors = function (callback, limit) {
    doctor.find(callback).limit(limit);
}

//add prescription
module.exports.addDoctor = function( Doctor ,callback){
    doctor.create(Doctor , callback);
}

//upadate prescription
module.exports.updateDoctor = function( id, Doctor, options ,callback){
    var query = {DoctorID:id};
    var update = {
        DoctorName : Doctor.DoctorName,
        Specialization : Doctor.Specialization,
        Hospital : Doctor.Hospital,
        Contact : Doctor.Contact,
    }
    doctor.findOneAndUpdate(query, update, options, callback);
}

//get doctors by DrugName
module.exports.getDoctorByName = function (DoctorName, callback) {
    doctor.find({DoctorName: DoctorName},callback);
}

//get last drug id
module.exports.getLastDoctorId = function (callback) {
    doctor.find(callback).sort({$natural:-1}).limit(1);
}

//delete doctor by id
module.exports.deleteDoctor = function(docID,callback){
    var query = {DoctorID: docID}
    doctor.remove(query,callback);

}