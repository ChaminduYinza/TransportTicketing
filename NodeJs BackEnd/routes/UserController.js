'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelUser = require('../models/User');
var modelAccount = require('../models/Account');
var modelToken = require('../models/Token');


router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------
router.get('/api/user', function(req, res) {

    modelUser.getUsers(function(err, userObj) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        res.json(userObj);

    });
});


//-------------------------------------------------------------------LOGIN VALIDATION ----------------------------

router.post('/api/user/login', function(req, res) {
    var credentials = req.body;
       modelUser.validateLogin(credentials[0].pid, function(err, userObj) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        }
        if (userObj.length < 1 || userObj[0].password != credentials[0].password) {
            res.json({
                success: true,
                validLogin: false,
                msg: 'Invalid  Login'
            });
        } else {
            res.json({
                success: true,
                validLogin: true,
                msg: 'Valid Login '
            });
        }

    });
});

//-----------------------------------------------------ADD USER ------------------------------------------------------------

router.post('/api/user', function(req, res) {
    var user = req.body;
    var newAccountNo;
    var lastId = 0;
    var lastTokenId = 0;
    var lastBarCode = 0;
    var lastQrCode = 0;
    var createdUser;

    modelUser.getLastPID(function(err, lastPID) {
        if (err) {
            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        } else {
            
            if (lastPID.length > 0 && lastPID[0].PID != 0) {
                lastId = lastPID[0].PID.split("P")[1];
                lastId = "P" + (parseInt(lastId) + 1);
            } else {
                lastId = "P1";
            }
            user[0].PID = lastId;
            addUser();
        }
    })

    function addUser() {

        modelUser.addUser(user, function(err, userObj) {
            if (err) {

                res.json({
                    success: false,
                    msg: 'Post request Fail by route user!!'
                });
                return;
            }
            getLastAccountNumber();

        });

    }

    function getLastAccountNumber() {

        modelAccount.getLastAccountNumber(function(err, lastAccountNumber) {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Get request Fail by route!!'
                });
                return;
            } else {
                if (lastAccountNumber.length > 0) {
                    newAccountNo = parseInt(lastAccountNumber[0].account_no) + 3;
                } else {
                    newAccountNo = "1001001000";
                }
                addAccount();
            }
        });

    }

    function addAccount() {
        var accountDetails = {
            "account_no": newAccountNo,
            "credit_amount": "0",
            "pid": lastId
        };
        modelAccount.addAccount(accountDetails, function(err, account) {
            if (err) {

                res.json({
                    success: false,
                    msg: 'Post request Fail by route!! account'
                });
                return;
            } else {
                getLastTokenNumber();
                //   res.json(account);

            }

        });

    }


    function getLastTokenNumber() {

        modelToken.getLastTokenNumber(function(err, lastToken) {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Get request Fail by route!!'
                });
                return;
            } else {

                if (lastToken.length > 0 && lastToken[0].token_no != 0) {
                    lastTokenId = lastToken[0].token_no.split("T")[1];
                    lastTokenId = "T" + (parseInt(lastTokenId) + 1);
                } else {
                    lastTokenId = "T1";
                }

                if (lastToken.length > 0 && lastToken[0].qr_code != 0) {
                    lastQrCode = lastToken[0].qr_code.split("Q")[1];
                    lastQrCode = "Q" + (parseInt(lastQrCode) + 3);
                } else {
                    lastQrCode = "Q1001001";
                }

                if (lastToken.length > 0 && lastToken[0].bar_code != 0) {
                    lastBarCode = lastToken[0].bar_code.split("B")[1];
                    lastBarCode = "B" + (parseInt(lastBarCode) + 3);
                } else {
                    lastBarCode = "B1001001";
                }



            }
            addToken();
        });

    }

    function addToken() {

        var tokenJSON = {
            "account_no": newAccountNo,
            "token_no": lastTokenId,
            "bar_code": lastBarCode,
            "qr_code": lastQrCode
        };
      
        modelToken.addToken(tokenJSON, function(err, token) {
            if (err) {

                res.json({
                    success: false,
                    msg: 'Post request Fail by route!!'
                });
                return;
            } else {

                res.json(token);

            }

        });


    }




});




module.exports = router;