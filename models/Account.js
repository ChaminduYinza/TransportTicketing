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



// //Add Stock
module.exports.addAccount = function(acc,callback){
Account.create(acc,callback);
 
}

module.exports.getLastAccountNumber = function (callback) {
    Account.find(callback).sort({$natural:-1}).limit(1);
}


 module.exports.identifyAccount = function(account_no,callback){

  Account.find({account_no: account_no},callback);

 }


 //Update account
module.exports.addCredit = function(accountNumber,amount,options,callback){
var query = {account_no: accountNumber}	
var update = {
	credit_amount: amount
}
Account.findOneAndUpdate(query,update,options,callback);

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