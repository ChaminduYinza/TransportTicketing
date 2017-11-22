
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BatchSchema = new Schema({

    batchNumber: {
        type: String,
        required: true
    },
    drugPrice:{
        type: String,
        required:true
    },

    drugName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },

    manufacturerDate: {
        type: String,
        required: true
    },
    exprieDate: {
        type: String,
        required: true
    }

});

var Batch = module.exports = mongoose.model('Batch',BatchSchema);


//get category
module.exports.getBatchs= function (callback, limit) {
    Batch.find(callback).limit(limit);
};



//get last batch record
module.exports.getLastBatchId = function (callback) {
    Batch.find(callback).sort({$natural:-1}).limit(1);
}


//add batch
module.exports.addBatch= function( batchinfo ,callback){
    Batch.create(batchinfo , callback);
}

//upadate category
module.exports.updateBatch= function( id, batchinfo, options ,callback){
    var query = {batchNumber:id};
    var update = {
        drugCategory : batchinfo.drugCategory,
        addedDate : batchinfo.addedDate,
        quantity : batchinfo.quantity


    }
    Batch.findOneAndUpdate(query, update, options , callback);
}