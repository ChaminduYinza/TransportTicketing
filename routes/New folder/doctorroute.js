/**
 * Created by Sameera on 6/30/2017.
 */

'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelDrug = require('../models/doctormodel');


router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/doctors', function (req, res) {

    modelDrug.getDoctors(function (err, doctors) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(doctors);
    })
});

//--------------------------------------------------------------GET Last Record ID+1----------------------------

router.get('/api/doctor/last', function (req, res) {
    var lastId=0;
    modelDrug.getLastDoctorId(function (err, lastDocID) {
        if(err){
            res.json({success:false, msg:'Get request Fail by route!!'});
        }else {
            if(lastDocID.length > 0){
                lastId = lastDocID[0].DoctorID.split("D")[1];
                res.send("D"+ (parseInt(lastId)+1));
            }
            else{
                res.send("D"+ (parseInt(lastId)+1));
            }
        }
    })
});

//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/doctor', function (req, res) {

    var doctor = req.body;
    if(doctor.DoctorName === "" || doctor.Specialization === "" || doctor.Hospital === "" ||
        doctor.Contact === "" || doctor.DoctorName === null || doctor.Specialization === null ||
        doctor.Hospital === null){
        res.json({success:false, msg:'Please enter values for required fields!'});
    }
    var lastId = 0;

    modelDrug.getLastDoctorId(function (err,lastDoctorId) {
        if(err){
            res.json({success:false, msg:'Request Fail by route!!'});
        }else{
            if(lastDoctorId.length > 0){
                lastId = lastDoctorId[0].DoctorID.split("D")[1];
            }
            else{
                lastId = 0;
            }
            doctor = {
                DoctorID: "D"+ (parseInt(lastId)+1),
                DoctorName: doctor.DoctorName,
                Specialization: doctor.Specialization,
                Hospital: doctor.Hospital,
                Contact: doctor.Contact
            };
            modelDrug.addDoctor(doctor, function (err, doctorRes) {
                if(err){
                    res.json(err);
                    res.json({success:false, msg:'Post request Fail by route!!'});
                }
                res.json(doctorRes);
            })
        }
    })

});


//--------------------------------------------------------------PUT Request-----------------------------

router.put('/api/doctor/:DoctorID', function (req, res) {
    var id = req.params.DoctorID;
    var doctor = req.body;
    modelDrug.updateDoctor(id, doctor, {new:true}, function (err,doctorRes) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Put request Fail by route!!'});
        }
        res.json(doctorRes);
    })
});

//--------------------------------------------------------------Find by DoctorName----------------------------

router.get('/api/doctor/:DoctorName', function (req, res) {
    var docName= req.params.DoctorName;
    modelDrug.getDoctorByName(docName, function (err, docRes) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(docRes);
    })
});

//------------------------------------------------------------DELETE------------------------------------------
router.delete('/api/doctor/remove/:DoctorID', function(req, res) {

    var docID = req.params.DoctorID;
    modelDrug.deleteDoctor(docID, function(err, doctor) {
        if (err) {
            res.json({
                success: false,
                msg: 'Post request Fail by route!!'
            });
        }
        res.json(doctor);
    });
});

module.exports = router;