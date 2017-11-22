var express=require('express');
var router=express.Router();

var User=require('../models/User');
var Patient=require('../models/Patient');
var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');
var getToken=require('../commons/utilities');
/**
 * add patient
 */
router.post('/create-patient',passport.authenticate('jwt', {session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var currentUserId = decoded._id;

    var patient = new Patient({
        name: req.body.name,
        age: ((req.body.age)),
        dateOfBirth: (req.body.dateOfBirth),
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        prescriptionDetails: req.body.prescriptionDetails,
        checkedBy: req.body.checkedBy,
        date: req.body.date,
        prescriptionNo:req.body.prescriptionNo

    });
    patient.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({success: false, msg: "error in saving to database"});
        }
        return res.json({success: true});
    })
});


/**
 * update patient
 */
router.post('/update-patient',passport.authenticate('jwt', {session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var currentUserId = decoded._id;

    Patient.update({_id:req.body.patient_id},{"$set":{"name":req.body.name,"age":req.body.age,"address":req.body.address}},function(err,parent){
        if(err){
            return res.json(err);
        }
        else{
            return res.json({success:true});
        }
    })

});

/**
 * delete patient
 */
router.delete('/remove-patient/:id',passport.authenticate('jwt', { session: false}),function (req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var requestingUserId=decoded._id;
    Patient.findOne({
        _id:req.params.id
    },function (err, patient) {
        if(err)return rest.json(err);
            patient.remove({_id:req.params.id},function (err, patient) {
                if(err){
                    res.send(err);
                }
                console.log(patient);
                res.json(patient);
            })

    });
});

module.exports=router;
