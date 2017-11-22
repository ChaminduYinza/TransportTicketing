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
	type: Date,
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
	
}

});

var Person = module.exports = mongoose.model('Person',personSchema);

//Get Stock

module.exports.getUsers = function(callback,limit){
Person.find(callback).limit(limit);

}

// module.exports.stockDetailsByID = function(id,callback){
// Person.findById(id,callback);

// }

// //Add Stock
module.exports.addUser = function(user,callback){
Person.create(user,callback);
 
}

// //Update Stock
// module.exports.updatePersontock = function(id,drug,options,callback){
// var query = {_id: id}	
// var update = {
// 	name: drug.name,
// 	amount: drug.amount,
// 	reorderlevel: drug.reorderlevel
// }
// Person.findOneAndUpdate(query,update,options,callback);

// }


// //Delete Drug from stock
// module.exports.deleteDrugFromStock = function(id,callback){
// 	var query = {_id: id}	
// Person.remove(query,callback);
 
// }