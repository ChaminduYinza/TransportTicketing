/**
 * Created by Sameera on 5/2/2017.
 */
'use strict'

var mongoose = require('mongoose');

//create schema for dispense

var despenseSchema = mongoose.Schema({
    DispenseDrugID:{
        type : String,
        required : true,
        default: "D"
    },
    PrescriptionID:{
        type : String,
        required : true
    },
    DrugName:{
        type : String,
        required : true
    },
    Quantity:{
        type : Number,
        required : true
    },
    Dosage:{
        type: String,
        required: true
    },
    Schedule:{
        type : String,
        required : true
    }
});


var DrugDispense = module.exports = mongoose.model('dispensedrugs',despenseSchema);

//get dispense
module.exports.getDispenseDrug = function (callback, limit) {
    DrugDispense.find(callback).limit(limit);
}

//add dispense
module.exports.addDrugDispensesDrug = function( Dispense ,callback){
    DrugDispense.create(Dispense , callback);
}

//upadate dispense
module.exports.updateDrugDispenseDrug = function( DispenseDrugID, dispense, options ,callback){
    var query = {DispenseDrugID:DispenseDrugID};
    var update = {
        DrugName : dispense.DrugName,
        PrescriptionID: dispense.PrescriptionID,
        Quantity : dispense.Quantity,
        Dosage: dispense.Dosage,
        Schedule : dispense.Schedule
    }
    DrugDispense.findOneAndUpdate(query, update, options , callback);
}

//get dispense drug by name
module.exports.getDispenseDrugByName = function (dispenseDrug, callback) {
    DrugDispense.find({DrugName: dispenseDrug},callback);
}

//get dispense drug by PrescriptionID  ID
module.exports.getDispenseDrugByPrescriptionID = function (pressId, callback) {
    DrugDispense.find({PrescriptionID: pressId},callback);
}

//get last drug id
module.exports.getLastDispenseDrugId = function (callback) {
    DrugDispense.find(callback).sort({$natural:-1}).limit(1);
}


//delete dissDrug by id
module.exports.deletePressDispenseDrug = function(DispenseDrugID,callback){
    var query = {DispenseDrugID: DispenseDrugID}
    DrugDispense.remove(query,callback);

}


//delete dissDrug by prescription id
module.exports.deletePressDrug = function(PrescriptionID,callback){
    var query = {PrescriptionID: PrescriptionID}
    DrugDispense.remove(query,callback);

}