var mongoose = require('mongoose');

//Drug Schema

var personSchema = mongoose.Schema({

PID:{
	type: String,
	required: true
},
password:{
	type: String,
	required: true
},
dob:{
	type: date,
	required: true
},
name:{
	type: String,
	required: true
},
address:[{
no:Number,
street:String,
city:String
}],

phoneNo:[{
	type: String,
	
}],
//default: Date.now
email:{
	type: String,
	required : true
	
},
username:{
	type:String
},
passengerID:{
	type:String
}

});

var Person = module.exports = mongoose.model('personSchema',personSchema);

//Get Stock

module.exports.getAvailableStock = function(callback,limit){
Person.find(callback).limit(limit);

}

module.exports.stockDetailsByID = function(id,callback){
Person.findById(id,callback);

}

//Add Stock
module.exports.addDrugToStock = function(drug,callback){
Person.create(drug,callback);
 
}

//Update Stock
module.exports.updatePersontock = function(id,drug,options,callback){
var query = {_id: id}	
var update = {
	name: drug.name,
	amount: drug.amount,
	reorderlevel: drug.reorderlevel
}
Person.findOneAndUpdate(query,update,options,callback);

}


//Delete Drug from stock
module.exports.deleteDrugFromStock = function(id,callback){
	var query = {_id: id}	
Person.remove(query,callback);
 
}