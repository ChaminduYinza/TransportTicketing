var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DrugCategorySchema = new Schema({

    drugCategoryId: {
        type: String,
        unique: true,
        required: true
    },
    drugCategory: {
        type: String,
        required: true
    },
    addedDate: {
        type: Date,
        required: true
    }

});

var Drugcategory = module.exports = mongoose.model('Drugcategory',DrugCategorySchema);


// //get category
module.exports.getDrugsCategory= function (callback, limit) {
    Drugcategory.find(callback).limit(limit);
};

//add category
module.exports.addDrugCategory= function( drugsCateinfo ,callback){
    Drugcategory.create(drugsCateinfo , callback);
}

 //get category by id
 module.exports.getDrugCategoryById= function (id, callback) {
     Drugcategory.findById(id,callback);
 };


//upadate category
module.exports.updateDrugCategory= function( id, drugsCateinfo, options ,callback){
    var query = {drugCategoryId:id};
    var update = {
        drugCategory : drugsCateinfo.drugCategory,
        addedDate : drugsCateinfo.addedDate

    }
    Drugcategory.findOneAndUpdate(query, update, options , callback);
}