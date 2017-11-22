'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Drugs = require('../models/stock');


router.use(bodyParser.json());

//---------------GET Request (Get All Drugs) ----------------------------------------------
router.get('/api/stock', function(req, res) {

    Drugs.getAvailableStock(function(err, stockDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        res.json(stockDetails);

    });
});

//---------------GET Request (Get Drugs by ID) ----------------------------------------------

router.get('/api/stock/:_id', function(req, res) {

    Drugs.stockDetailsByID(req.params._id, function(err, stockDetail) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        res.json(stockDetail);

    });
});

//---------------POST Request (Add Drugs) ----------------------------------------------

router.post('/api/stock', function(req, res) {
    var drug = req.body;
    if (!req.body.name || !req.body.amount) {

        res.json({
            success: false,
            msg: 'Please fill the missing fields'
        });
    } else {
        Drugs.findOne({
            name: req.body.name
        }, function(err, drugName) {
            if (err) throw err;

            if (drugName) {
                res.json({
                    success: false,
                    msg: "There is already a drug named " + req.body.name + " in the system",
                    drugID: drugName._id,
                    currentAmount: drugName.amount
                });
            } else {
                Drugs.addDrugToStock(drug, function(err, drug) {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Post request Fail by route!!'
                        });
                    }
                    res.json(drug);
                });
            }
        })
    }
});



//---------------PUT Request (Update Drug by ID) ----------------------------------------------


router.put('/api/stock/:_id', function(req, res) {

    var id = req.params._id;
    var drug = req.body;

    Drugs.updateDrugStock(id, drug, {}, function(err, drug) {
        if (err) {
            res.json({
                success: false,
                msg: 'Post request Fail by route!!'
            });
        }
        res.json(drug);
    });


});


//---------------GET Request (Reorder Level) ----------------------------------------------
router.get('/api/reoderverification', function(req, res) {

    Drugs.getAvailableStock(function(err, stockDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        //res.json(stockDetails);
        var reorderAlert = [];


        for (var i = 0; i < stockDetails.length; i++) {

           // if (stockDetails[i].hasOwnProperty('reorderlevel') && stockDetails[i].hasOwnProperty('amount')) {
           //stockDetails= JSON.stringify(stockDetails);
                if (stockDetails[i].amount <= stockDetails[i].reorderlevel) {
                    reorderAlert.push({
                    	id : i,
                        drugName: stockDetails[i].name,
                        availableAmount: stockDetails[i].amount,
                        reorderLevel: stockDetails[i].reorderlevel
                    });
                }
            //}




        }
        res.json(reorderAlert);

    });
});

//



router.delete('/api/stock/:_id', function(req, res) {

    var id = req.params._id;
      Drugs.deleteDrugFromStock(id, function(err, drug) {
        if (err) {
            res.json({
                success: false,
                msg: 'Post request Fail by route!!'
            });
        }
        res.json(drug);
    });


});





module.exports = router;

