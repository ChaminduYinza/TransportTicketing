/**
 * Created by Sameera on 5/7/2017.
 */

'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelprescrip = require('../models/prescriptionmodel');


router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/prescriptions', function (req, res) {
    modelprescrip.getPrescriptions(function (err, Prescription) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'request Fail by route!!'});
        }
        res.json(Prescription);
    });
});


//--------------------------------------------------------------GET Last Record ID+1----------------------------

router.get('/api/prescription/last', function (req, res) {
    var lastId=0;
    modelprescrip.getLastDispensePresId(function (err, lastPressID) {
        if(err){
            res.json({success:false, msg:'Get request Fail by route!!'});
        }else {
            if(lastPressID.length > 0){
                lastId = lastPressID[0].PrescriptionID.split("PR")[1];
                res.send("PR"+ (parseInt(lastId)+1));
            }
            else{
                res.send("PR"+ (parseInt(lastId)+1));
            }
        }
    })
});

//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/prescription', function (req, res) {
    var prescr = req.body;
    if(prescr.PatientName === "" ||prescr.DoctorName===""|| prescr.CreatedDate === "" || prescr.PrescriptionDate === "" ||
        prescr.Age === "" || prescr.Reason === "" || prescr.PrescriptionStatus === "" || prescr.PatientName === null
        ||prescr.DoctorName=== null || prescr.CreatedDate === null || prescr.PrescriptionDate === null ||
        prescr.Age === null || prescr.Reason === null || prescr.PrescriptionStatus === null){

            res.json({success:false, msg:'Please enter values for required fields!'});
    }
    var lastId = 0;
    modelprescrip.getLastDispensePresId(function (err,lastPressId) {
        if(err){
            res.json({success:false, msg:'Request Fail by route!!'});
        }else{

            if(lastPressId.length > 0){
                lastId = lastPressId[0].PrescriptionID.split("PR")[1];
            }

            else{
                lastId = 0;
            }

            prescr = {
                PrescriptionID: "PR"+ (parseInt(lastId)+1),
                PatientName: prescr.PatientName,
                DoctorName: prescr.DoctorName,
                CreatedDate: prescr.CreatedDate,
                PrescriptionDate: prescr.PrescriptionDate,
                Age: prescr.Age,
                Reason: prescr.Reason,
                PrescriptionStatus: prescr.PrescriptionStatus
            };
            modelprescrip.addPrescription(prescr, function (err,press) {
                if(err){
                    res.json(err);
                    res.json({success:false, msg:'request Fail by route!!'});
                }
                res.json(press);
            })
        }
    })

});


//--------------------------------------------------------------PUT Request-----------------------------

router.put('/api/prescriptions/:PrescriptionID', function (req, res) {
    var PrescriptionID = req.params.PrescriptionID;
    var prescr = req.body;
    modelprescrip.updatePrescription(PrescriptionID, prescr, {new:true}, function (err,press) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'request Fail by route!!'});
        }
        res.json(press);
    })
});

//--------------------------------------------------------------Find by Prescription ID----------------------------

router.get('/api/prescriptions/:PrescriptionID', function (req, res) {
    var PrescriptionID= req.params.PrescriptionID;
    modelprescrip.getPrescriptionById(PrescriptionID, function (err, Prescription) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'request Fail by route!!'});
        }
        res.json(Prescription);
    });
});


//--------------------------------------------------------------Find by prescription status----------------------------

router.get('/api/prescriptions/status/:PrescriptionStatus', function (req, res) {
    var presStatus= req.params.PrescriptionStatus;
    modelprescrip.getPrescriptionByStatus(presStatus, function (err, Prescription) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'request Fail by route!!'});
        }
        res.json(Prescription);
    });
});


//------------------------------------------------------------DELETE------------------------------------------
router.delete('/api/prescription/remove/:PrescriptionID', function(req, res) {

    var PrescriptionID = req.params.PrescriptionID;
    modelprescrip.deletePress(PrescriptionID, function(err, press) {
        if (err) {
            res.json({
                success: false,
                msg: 'Post request Fail by route!!'
            });
        }
        res.json(press);
    });
});


module.exports = router;