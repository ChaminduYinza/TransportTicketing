
'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelDrug = require('../models/drug');


router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/drug', function (req, res)  {

    modelDrug.getDrugs(function (err, DrugObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(DrugObj);
    })
});


router.get('/api/drug/:drugId', function (req, res)  {

    modelDrug.getDrugById(req.params.drugId,function (err, DrugObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(DrugObj);
    })
});



router.get('/api/drug/category/:drugCategory', function (req, res) {
    var drugCategory= req.params.drugCategory;
    modelDrug.getDrugByCategory(drugCategory, function (err, catDrug) {
        if(err){
            res.json({success:false, msg:'Request Fail by route!!'});
        }
        res.json(catDrug);
    })
});

router.get('/api/drug/drugname/:drugName', function (req, res) {
    var drugName= req.params.drugName;
    modelDrug.getDrugByName(drugName, function (err, catDrug) {
        if(err){
            res.json({success:false, msg:'Request Fail by route!!'});
        }
        res.json(catDrug);
    })
});

//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/drug', function (req, res) {

    var prescr = req.body;
   // res.json('asd');
    modelDrug.addDrug(prescr, function (err,DrugObj) {
        if(err){
            //res.json(err);
            res.json({success:false, msg:'Post request Fail by route!!'});
        }
        res.json(DrugObj);
    })
});

//--------------------------------------------------------------PUT Request-----------------------------

router.put('/api/drug/:drugId', function (req, res) {
    var id = req.params.drugId;
    var drugs = req.body;
    modelDrug.updateDrug(id, drugs, {}, function (err,DrugObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Put request Fail by route!!'});
        }
        res.json(DrugObj);
    })
});


module.exports = router;