var mongoose = require('mongoose');

//Account Schema

var AccountSchema = mongoose.Schema({

    account_no: {
        type: Number,
        required: true
    },
    credit_amount: {
        type: String,
        required: true
    },
    pid: {
        type: String,
        required: true
    }

});

var Account = module.exports = mongoose.model('Account', AccountSchema);



//---------------------------------------------------Add account-----------------------------

module.exports.addAccount = function(acc, callback) {
    Account.create(acc, callback);

}

//---------------------------------------------------Get last account from the database in order to generate
//---------------------------------------------------account numbers automatically-----------------------------
module.exports.getLastAccountNumber = function(callback) {
    Account.find(callback).sort({
        $natural: -1
    }).limit(1);
}

//---------------------------------------------------Find by account number-----------------------------
module.exports.identifyAccount = function(account_no, callback) {

    Account.find({
        account_no: account_no
    }, callback);

}


//---------------------------------------------------Add credit to an account-----------------------------
module.exports.addCredit = function(accountNumber, amount, options, callback) {
    var query = {
        account_no: accountNumber
    }
    var update = {
        credit_amount: amount
    }
    Account.findOneAndUpdate(query, update, options, callback);

}

//---------------------------------------------------Deduct credit from account-----------------------------
module.exports.deductCredit = function(accountNumber, amount, options, callback) {
    var query = {
        account_no: accountNumber
    }
    var update = {
        credit_amount: amount
    }
    Account.findOneAndUpdate(query, update, options, callback);

}























































































module.exports.getUsers = function(callback, limit) {
    Account.find(callback).limit(limit);

}