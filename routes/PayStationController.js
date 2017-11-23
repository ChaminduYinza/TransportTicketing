'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelUser = require('../models/User');
var modelAccount = require('../models/Account');
var modelToken = require('../models/Token');



router.use(bodyParser.json());


//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/payStation/getToken/:token_no', function(req, res) {

    modelToken.identifyToken(req.params.token_no, function(err, passengerDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        res.json(passengerDetails);

    });
});

//----------------------------------------------------------------PUT Request (Add Credit to account)------------------------------

router.put('/api/payStation/addCredit/:account_no', function (req, res) {
    var id = req.params.account_no;
    var amount = req.body[0].amount;
    console.log(amount);
   

modelAccount.identifyAccount(id, function(err, accountDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        }else{
console.log(accountDetails[0]);
        		amount = (parseInt(accountDetails[0].credit_amount) + parseInt(amount));
 console.log(amount);

        		addCredit();
        }

    });


function addCredit(){

	  modelAccount.addCredit(id, amount, {}, function (err,accountDetails) {
        if(err){
            
            res.json({success:false, 
            	msg:'Put request Fail by route!!'});
            return;
        }
        accountDetails.credit_amount = amount;
        res.json(accountDetails);
    })

}

  
});


  













module.exports = router;