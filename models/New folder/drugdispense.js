/**
 * Created by Sameera on 5/2/2017.
 */
'use strict'

var mongoose = require('mongoose');


//create schema for dispense

var despenseSchema = mongoose.Schema({
    DrugDescription:{
        type : String,
        required : true
    },
    Dosage:{
        type: String,
        required: true
    },
    Frequency:{
        type : String,
        required : true
    },
    Period:{
        type : String,
        required : true
    },
    Quantity:{
        type : String,
        required : true
    },
    DrugID:{
        type : String,
        required : true
    },
    DispenseStatus:{
        type : String,
        required : true
    }
});


var DrugDispense = module.exports = mongoose.model('drugdispense',despenseSchema);

//get dispense

module.exports.getDispense = function (callback, limit) {
    DrugDispense.find(callback).limit(limit);
}

//add dispense

module.exports.addDrugDispenses = function( Dispense ,callback){
    DrugDispense.create(Dispense , callback);
}

//upadate dispense
module.exports.updateDrugDispense = function( id, dispense, options ,callback){
    var query = {_id:id};
    var update = {
        DrugDescription : dispense.DrugDescription,
        Dosage : dispense.Dosage,
        Period: dispense.Period,
        Quantity : dispense.Quantity,
        DispenseStatus : dispense.DispenseStatus
    }
    DrugDispense.findOneAndUpdate(query, update, options , callback);
}