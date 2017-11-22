var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DrugSchema= new Schema({


    drugCategory: {
        type: String,
        required:true
    },
    drugName: {
        type: String,
        unique:true,
        required: true
    },
    drugType: {
        type: String,
        required: true
    },
    drugPrice: {
        type: String,
        required: true
    },

    remarks: {
        type: String

    },

    dangerLevel: {
        type: Number,
        required: true
    },

    reorderLevel: {
        type: Number,
        required: true
    },

    dosage: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        required: true
    }

});

var Drugs  = module.exports = mongoose.model('drugs',DrugSchema);


//get drugs
module.exports.getDrugs= function (callback, limit) {
    Drugs.find(callback).limit(limit);
};

//get drugs by id
module.exports.getDrugById= function (id, callback) {
    Drugs.findById(id,callback);
};

//get drugs  by category
module.exports.getDrugByCategory = function (catDrug, callback) {
    Drugs.find({drugCategory: catDrug},callback);
}

//get drugs  by drugname
module.exports.getDrugByName = function (catDrug, callback) {
    Drugs.find({drugName: catDrug},callback);
}


//add drugs
module.exports.addDrug= function( drugsinfo ,callback){
    Drugs.create(drugsinfo , callback);
}

//upadate drugs
module.exports.updateDrug= function( drugId, drugsinfo, options ,callback){
    var query = {drugId:id};
    var update = {
        drugCategory : drugsinfo.drugCategory,
        drugName : drugsinfo.drugName,
        drugType: drugsinfo.drugType,
        drugPrice : drugsinfo.drugPrice,
        remarks: drugsinfo.remarks,
        dangerLevel: drugsinfo.dangerLevel,
        reorderLevel: drugsinfo.reorderLevel,
        dosage: drugsinfo.dosage,
        frequency: drugsinfo.frequency
    }
    Drugs.findOneAndUpdate(query, update, options , callback);
}

// var DrugCategorySchema = new Schema({
//
//     drugCategoryId: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     drugCategory: {
//         type: String,
//         required: true
//     },
//     addedDate: {
//         type: Date,
//         required: true
//     }
//
// });
//
// var drugcategory = module.exports = mongoose.model('Drugcate',DrugCategorySchema);
//
//
// // //get category
// module.exports.getDrugsCategory = function (callback, limit) {
//    drugcategory.find(callback).limit(limit);
// };
//
// // //get category by id
// module.exports.getDrugCategoryById = function (id, callback) {
//     drugcategory.findById(id,callback);
// };
//
//  //add category
//  module.exports.addDrugCategory = function( drugsCateinfo ,callback){
//     drugcategory.create(drugsCateinfo , callback);
// }
//
// //upadate category
// module.exports.updateDrugCategory= function( id, drugsCateinfo, options ,callback){
//      var query = {drugCategoryId:id};
//      var update = {
//          drugCategory : drugsCateinfo.drugCategory,
//         addedDate : drugsCateinfo.addedDate
//
//      }
//     drugcategory.findOneAndUpdate(query, update, options ,  callback);
// }
