'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelUser = require('../models/User');
var modelAccount = require('../models/Account');
var modelToken = require('../models/Token');
var modelRoute = require('../models/Route')
var modelFare = require('../models/Fare')
var modelPayment = require('../models/Payment')



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

        if (passengerDetails.length <= 0) {

            res.json({
                success: false,
                msg: 'Invalid token number'
            });

        } else {

            modelAccount.identifyAccount(passengerDetails[0].account_no, function(err, accountDetails) {
                if (err) {

                    res.json({
                        success: false,
                        msg: 'Get request Fail by route!!'
                    });
                }
                var returnJSON = {

                    "account_no": accountDetails[0].account_no,
                    "pid": accountDetails[0].pid,
                    "token_no": passengerDetails[0].token_no,
                    "bar_code": passengerDetails[0].bar_code,
                    "qr_code": passengerDetails[0].qr_code

                };

                res.json(returnJSON);

            });


        }




    });
});

//----------------------------------------------------------------PUT Request (Add Credit to account)------------------------------

router.put('/api/payStation/addCredit/:account_no', function(req, res) {
    var id = req.params.account_no;
    var amount = req.body[0].amount;
    modelAccount.identifyAccount(id, function(err, accountDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;

        }

        if(accountDetails.length <= 0 ){
                       res.json({
                    success: false,
                    msg: 'Invalid account number'
                });
                return;
        }

        amount = (parseInt(accountDetails[0].credit_amount) + parseInt(amount));
        addCredit();

    });

    function addCredit() {
        modelAccount.addCredit(id, amount, {}, function(err, accountDetails) {
            if (err) {

                res.json({
                    success: false,
                    msg: 'Put request Fail by route!!'
                });
                return;
            }
            accountDetails.credit_amount = amount;
            res.json(accountDetails);
        })

    }


});




//----------------------------------------------------------------PUT Request (Deduct Credit from an  account and update payment)------------------------------

router.put('/api/account/deductCredit/:account_no', function(req, res) {
    var id = req.params.account_no;
    var amount = req.body[0].amount;
    var journeyID = req.body[0].jid;
    var payment_type = req.body[0].payment_type;
    var paymentDetails = [];




    modelPayment.getLastPayId(function(err, lastPayID) {
        if (err) {
            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        } else {

            if (lastPayID.length > 0) {
                lastPayID = lastPayID[0].payid.split("PI")[1];
                lastPayID = "PI" + (parseInt(lastPayID) + 1);
            } else {
                lastPayID = "PI1";
            }
            paymentDetails = [{
                "payid": lastPayID,
                "jid": journeyID,
                "amount": amount,
                "payment_type": payment_type

            }];
            addPayment();

        }
    })

    function addPayment() {


        modelPayment.addPayment(paymentDetails, function(err, journeyObj) {
            if (err) {

                res.json({
                    success: false,
                    msg: 'Post request Fail by route user!!'
                });
                return;
            }

            modelAccount.identifyAccount(id, function(err, accountDetails) {
                if (err) {

                    res.json({
                        success: false,
                        msg: 'Get request Fail by route!!'
                    });
                    return;

                }

                amount = (parseInt(accountDetails[0].credit_amount) - parseInt(amount));
                deductCredit();

            });

            function deductCredit() {
                modelAccount.deductCredit(id, amount, {}, function(err, accountDetails) {
                    if (err) {

                        res.json({
                            success: false,
                            msg: 'Put request Fail by route!!'
                        });
                        return;
                    }
                    accountDetails.credit_amount = amount;
                    res.json(accountDetails);
                })

            }


        });


    }




});

//------------------------------------------ VIEW ACCOUNT BALANCE ---------------------------------------------------------
router.get('/api/payStation/balance/:account_no', function(req, res) {
    modelAccount.identifyAccount(req.params.account_no, function(err, accountDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        res.json(accountDetails);

    });


});

//----------------------------------------------------------------- VALIDATE CREDIT ------------------------------------
router.post('/api/account/validateCredit/:account_no', function(req, res) {
    var journeyDetails = req.body;

    modelRoute.getEndPoint(journeyDetails[0].route_no, function(err, routeDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        if (routeDetails.length <= 0) {
            res.json({
                success: false,
                msg: 'Invalid route number'
            });
            return;
        }
       
        modelFare.getFare(journeyDetails[0].start_point, routeDetails[0].end_point, journeyDetails[0].route_no, function(err, fareDetails) {
            if (err) {

                res.json({
                    success: false,
                    msg: 'Get request Fail by route!!'
                });
            }
 console.log(fareDetails)
            if (fareDetails.lenght <= 0) {

                res.json({
                    success: false,
                    msg: 'Get request Fail by route!!'
                });
                return;

            }
            modelAccount.identifyAccount(req.params.account_no, function(err, accountDetails) {
                if (err) {

                    res.json({
                        success: false,
                        msg: 'Get request Fail by route!!'
                    });
                    return;
                }

                if (accountDetails[0].credit_amount >= fareDetails[0].amount) {

                    res.json({
                        success: true,
                        creditStatus: true

                    });

                } else {
                    res.json({
                        success: true,
                        creditStatus: false

                    });

                }

            });

        });

    });

});

module.exports = router;