/**
 * Created by Sameera on 5/7/2017.
 */
'user strict'

var express = require('express');
var router = express.Router();

var modeldispense = require('../models/drugdispensemodel');


//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/dispensedrugs', function (req, res) {
    modeldispense.getDispenseDrug(function (err, dispense) {
        if(err){
            res.json({success:false, msg:'Request Fail by route!!'});
        }
        res.json(dispense);
    });
});


//--------------------------------------------------------------GET Last Record ID+1----------------------------

router.get('/api/dispensedrug/last', function (req, res) {
    var lastId=0;
    modeldispense.getLastDispenseDrugId(function (err, lastDisId) {
        if(err){
            res.json({success:false, msg:'Get request Fail by route!!'});
        }else {
            if(lastDisId.length > 0){
                lastId = lastDisId[0].DispenseDrugID.split("D")[1];
                res.send("D"+ (parseInt(lastId)+1));
            }
            else{
                res.send("D"+ (parseInt(lastId)+1));
            }
        }
    })
});

//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/dispensedrug', function (req, res) {
    var drugDis = req.body;
    if(drugDis.DrugName === "" ||drugDis.PrescriptionID===""|| drugDis.Quantity === "" || drugDis.Dosage === "" ||
        drugDis.Schedule === "" || drugDis.DrugName === null || drugDis.PrescriptionID === null || drugDis.Quantity === null
        || drugDis.Dosage === null || drugDis.Schedule === null ){
        res.json({success:false, msg:'Please enter values for required fields!!'});
    }
    var lastId = 0;
    modeldispense.getLastDispenseDrugId(function (err,lastDispenseId) {
        if(err){
            res.json({success:false, msg:'Request Fail by route!!!'});
        }else{

            if(lastDispenseId.length > 0){
                lastId = lastDispenseId[0].DispenseDrugID.split("D")[1];
            }

            else{
                lastId = 0;
            }

            drugDis = {
                DispenseDrugID: "D"+ (parseInt(lastId)+1),
                DrugName: drugDis.DrugName,
                PrescriptionID: drugDis.PrescriptionID,
                Quantity: drugDis.Quantity,
                Dosage: drugDis.Dosage,
                Schedule: drugDis.Schedule
            };
            modeldispense.addDrugDispensesDrug(drugDis, function (err, drugDispense) {
                if (err) {
                    res.json({success: false, msg: 'Request Fail by route!!'});
                }
                res.json(drugDispense);
            })
        }
    })
});

//--------------------------------------------------------------PUT Request by -----------------------------

router.put('/api/dispensedrug/:DispenseDrugID', function (req, res) {
    var id = req.params.DispenseDrugID;
    var drugDis = req.body;
    modeldispense.updateDrugDispenseDrug(id, drugDis, {new: true}, function (err,drugDispense) {
        if(err) {
            res.json({success: false, msg: 'Request Fail by route!!'});
        }
        res.json(drugDispense);
    })
});

//--------------------------------------------------------------Find by DrugName----------------------------

router.get('/api/dispensedrug/name/:DrugName', function (req, res) {
    var drugName= req.params.DrugName;
    modeldispense.getDispenseDrugByName(drugName, function (err, dispenseDrug) {
        if(err){
            res.json({success:false, msg:'Request Fail by route!!'});
        }
        res.json(dispenseDrug);
    })
});

//--------------------------------------------------------------Find by PrescriptionID----------------------------

router.get('/api/dispensedrug/id/:PrescriptionID', function (req, res) {
    var pressId= req.params.PrescriptionID;
    modeldispense.getDispenseDrugByPrescriptionID(pressId, function (err, dispenseDrug) {
        if(err){
            res.json({success:false, msg:'Request Fail by route!!'});
        }
        res.json(dispenseDrug);
    })
});


//------------------------------------------------------------DELETE------------------------------------------
router.delete('/api/dispensedrug/remove/:DispenseDrugID', function(req, res) {

    var DispenseDrugID = req.params.DispenseDrugID;
    modeldispense.deletePressDispenseDrug(DispenseDrugID, function(err, diss) {
        if (err) {
            res.json({
                success: false,
                msg: 'Post request Fail by route!!'
            });
        }
        res.json(diss);
    });
});

//------------------------------------------------------------DELETE------------------------------------------
router.delete('/api/dispensedrug/remove/prescription/:PrescriptionID', function(req, res) {

    var PrescriptionID = req.params.PrescriptionID;
    modeldispense.deletePressDrug(PrescriptionID, function(err, diss) {
        if (err) {
            res.json({
                success: false,
                msg: 'Post request Fail by route!!'
            });
        }
        res.json(diss);
    });
});


module.exports = router;