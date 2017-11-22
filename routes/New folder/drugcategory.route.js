
'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelDrugCategory = require('../models/drugcategory');


router.use(bodyParser.json());
//--------------------------------------------------------------GET Requests----------------------------

router.get('/api/drugcategory', function (req, res) {

    modelDrugCategory.getDrugsCategory(function (err, DrugObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(DrugObj);
    })
});

//------------------------Get by id ---------------------------------------------------
router.get('/api/drugcategory/:_id', function (req, res)  {

    modelDrugCategory.getDrugCategoryById(req.params._id,function (err, DrugCategoryObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Get request Fail by route!!'});
        }
        res.json(DrugCategoryObj);
    })
});
//--------------------------------------------------------------POST Requests----------------------------

router.post('/api/drugcategory', function (req, res) {

    var prescr = req.body;
    // res.json('asd');
    modelDrugCategory.addDrugCategory(prescr, function (err,DrugCategoryObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Post request Fail by route!!'});
        }
        res.json(DrugCategoryObj);
    })
});

//--------------------------------------------------------------PUT Request-----------------------------

router.put('/api/drugcategory/:_id', function (req, res) {
    var id = req.params._id;
    var drugs = req.body;
    modelDrugCategory.updateDrugCategory(id, drugs, {}, function (err,DrugCategoryObj) {
        if(err){
            res.json(err);
            res.json({success:false, msg:'Put request Fail by route!!'});
        }
        res.json(DrugCategoryObj);
    })
});


module.exports = router;