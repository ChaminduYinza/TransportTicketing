var mongoose = require('mongoose');

//Account Schema

var AccountSchema = mongoose.Schema({

account_no:{
	type: Number,
	required: true
},
credit_amount:{
	type: String,
	required: true
},
pid:{
	type: String,
	required: true
}

});

var Account = module.exports = mongoose.model('Account',AccountSchema);

//Get Stock

module.exports.getUsers = function(callback,limit){
Account.find(callback).limit(limit);

}

 module.exports.validateLogin = function(email,callback){

  Account.find({email: email},callback);

 }

// //Add Stock
module.exports.addAccount = function(acc,callback){
Account.create(acc,callback);
 
}

module.exports.getLastAccountNumber = function (callback) {
    Account.find(callback).sort({$natural:-1}).limit(1);
}


// //Update Stock
// module.exports.updatePersontock = function(id,drug,options,callback){
// var query = {_id: id}	
// var update = {
// 	name: drug.name,
// 	amount: drug.amount,
// 	reorderlevel: drug.reorderlevel
// }
// Account.findOneAndUpdate(query,update,options,callback);

// }


// //Delete Drug from stock
// module.exports.deleteDrugFromStock = function(id,callback){
// 	var query = {_id: id}	
// Account.remove(query,callback);
 
// }