'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelUser = require('../models/User');
var modelAccount = require('../models/Account');



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


router.post('/api/user/login', function(req, res) {
    var credentials = req.body;
    //console.log(credentials[0].email);
    modelUser.validateLogin(credentials[0].email, function(err, userObj) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        }
        if (userObj[0].password == credentials[0].password) {

            res.json({
                success: true,
                msg: 'Valid Login '
            });
        } else {
            res.json({
                success: false,
                msg: 'Invalid  Login'
            });
        }


    });
});

//-----------------------------------------------------ADD USER ------------------------------------------------------------

router.post('/api/user', function(req, res) {
    var user = req.body;
    var newAccountNo;
    var lastId = 0;
    var createdUser;

    modelUser.getLastPID(function(err, lastPID) {
        if (err) {
            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        } else {
            console.log(lastPID[0].PID);
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
                res.json(account);

            }

        });

    }


});






// //--------------------------------------------------------------POST Requests----------------------------

// router.post('/api/batch', function (req, res) {
//     var prescr = req.body;
//     modelUser.addBatch(prescr, function (err,batchObj) {
//         if(err){

//             res.json({success:false, msg:'Post request Fail by route!!'});
//             return;
//         }
//         res.json(batchObj);
//     })
// });

// //--------------------------------------------------------------PUT Request-----------------------------

// router.put('/api/batch/:batchNumber', function (req, res) {
//     var id = req.params.batchNumber;
//     var modelUser = req.body;
//     modelUser.updateBatch(id, modelUser, {}, function (err,batchObj) {
//         if(err){
//             res.json(err);
//             res.json({success:false, msg:'Put request Fail by route!!'});
//         }
//         res.json(batchObj);
//     })
// });


module.exports = router;