
'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelPerson = require('../models/Person');


router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/getPerson', function (req, res) {
    modelPerson.getBatchs(function (err, batchObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(batchObj);
    });
});

//--------------------------------------------------------------GET Last Record ID+1----------------------------

// router.get('/api/batch/last', function (req, res) {
//     var lastId=0;
//     modelPerson.getLastBatchId(function (err, lastBatchID) {
//         if(err){
//             res.json({success:false, msg:'Get request Fail by route!!'});
//         }else {
//             if(lastBatchID.length > 0){
//                 lastId = lastBatchID[0].batchNumber.split("BA")[1];
//                 res.send("BA"+ (parseInt(lastId)+1));
//             }
//             else{
//                 res.send("BA"+ (parseInt(lastId)+1));
//             }
//         }
//     })
// });

// //--------------------------------------------------------------POST Requests----------------------------

// router.post('/api/batch', function (req, res) {
//     var prescr = req.body;
//     modelPerson.addBatch(prescr, function (err,batchObj) {
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
//     var drugs = req.body;
//     modelPerson.updateBatch(id, drugs, {}, function (err,batchObj) {
//         if(err){
//             res.json(err);
//             res.json({success:false, msg:'Put request Fail by route!!'});
//         }
//         res.json(batchObj);
//     })
// });


module.exports = router;