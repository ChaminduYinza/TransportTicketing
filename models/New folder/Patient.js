var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt'); //for encrypting passwords

var PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    contactNumber: {
        type: String,
        required: true
    },

    prescriptionNo: {
        type: String,
        required: true
    },

    prescriptionDetails: {
        type: String,
        required: true
    },

    checkedBy: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }

});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;