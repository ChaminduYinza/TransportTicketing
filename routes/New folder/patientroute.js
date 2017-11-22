/**
 * Created by Sameera on 6/30/2017.
 */

'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var patient = require('../models/patientmodel');
var passport    = require('passport');
var jwt  = require('jwt-simple');
router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/patients', function (req, res) {

    patient.getPatient(function (err, patient) {
        if(err){
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(patient);
    })
});

//--------------------------------------------------------------GET Last Record ID+1----------------------------

router.get('/api/patient/last', function (req, res) {
    var lastId=0;
    patient.getLastPatientId(function (err, lastPatientID) {
        if(err){
            res.json({success:false, msg:'Get request Fail by route!!'});
        }else {
            if(lastPatientID.length > 0){
                lastId = lastPatientID[0].PatientID.split("PA")[1];
                res.send("PA"+ (parseInt(lastId)+1));
            }
            else{
                res.send("PA"+ (parseInt(lastId)+1));
            }
        }
    })
});

//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/patient', passport.authenticate('jwt',{session:false}), function (req, res) {

    var Patientbody = req.body;
    if(Patientbody.PatientName === "" || Patientbody.DateOfBirth === "" || Patientbody.ContactNumber === "" ||
        Patientbody.PatientName === null || Patientbody.DateOfBirth === null ||
        Patientbody.ContactNumber === null){
        res.json({success:false, msg:'Please enter values for required fields!'});
    }
    var lastId = 0;

    patient.getLastPatientId(function (err,lastPatientId) {
        if(err){
            res.json({success:false, msg:'Request Fail by route!!'});
        }else{
            if(lastPatientId.length > 0){
                lastId = lastPatientId[0].PatientID.split("PA")[1];
            }
            else{
                lastId = 0;
            }
            Patientbody = {
                PatientID: "PA"+ (parseInt(lastId)+1),
                PatientName: Patientbody.PatientName,
                DateOfBirth: Patientbody.DateOfBirth,
                ContactNumber: Patientbody.ContactNumber
            };
            patient.addPatient(Patientbody, function (err, patientRes) {
                if(err){
                    res.json(err);
                    res.json({success:false, msg:'Post request Fail by route!!'});
                }
                res.json(patientRes);
            })
        }
    })

});


//--------------------------------------------------------------PUT Request-----------------------------

router.put('/api/patient/:PatientID', function (req, res) {
    var PatientID = req.params.PatientID;
    var Patient = req.body;
    patient.updatePatient(PatientID, Patient, {new:true}, function (err,patientRes) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Put request Fail by route!!'});
        }
        res.json(patientRes);
    })
});

//--------------------------------------------------------------Find by PatientName----------------------------

router.get('/api/patient/:PatientName', function (req, res) {
    var patientName= req.params.PatientName;
    patient.getPatientByName(patientName, function (err, patiRes) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(patiRes);
    })
});

//------------------------------------------------------------DELETE------------------------------------------
router.delete('/api/patient/remove/:PatientID', function(req, res) {

    var patId = req.params.PatientID;
    patient.deletePatient(patId, function(err, patnt) {
        if (err) {
            res.json({
                success: false,
                msg: 'Post request Fail by route!!'
            });
        }
        res.json(patnt);
    });


});


module.exports = router;
