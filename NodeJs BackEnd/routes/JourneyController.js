'user strict'

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var modelUser = require('../models/User');
var modelAccount = require('../models/Account');
var modelToken = require('../models/Token');
var modelJourney = require('../models/Journey');


router.use(bodyParser.json());


router.get('/api/journey', function(req, res) {

    modelJourney.getAllJourney(function(err, journeyObj) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
        }
        res.json(journeyObj);

    });
});

//----------------------------------GET START POINT OF A JOURNEY BY PID --------------------------------



router.get('/api/journey/:pid', function(req, res) {

    modelJourney.getStartPoint(req.params.pid, function(err, journeyObj) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        }

        if (journeyObj.length > 0) {
            //[0].start_point
            res.json(journeyObj[0]);
        } else {
            res.json({
                success: false,
                msg: 'Passenger is not currently on a journey'
            });
        }


    });
});



//---------------------------------------------------- UPDATE JOURNEY FLAG TO FALSE -------------------------------------------------------
router.put('/api/journey/:pid', function(req, res) {
    var pid = req.params.pid;
    var end_point = req.body[0].end_point;
    console.log(req.body[0]);
    console.log(req.body);
    modelJourney.isJourneyAvailable(req.params.pid, function(err, journeyDetails) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;

        }

        if (journeyDetails.length > 0) {
            console.log(journeyDetails.length)
            modelJourney.updateJourney(journeyDetails[0].jid, end_point, {}, function(err, journeyObj) {
                if (err) {

                    res.json({
                        success: false,
                        msg: 'Put request Fail by route!!'
                    });
                    return;
                }

                res.json({
                    success: true,
                    msg: 'Successfully updated!'
                });
                return;
            })




        } else {
            res.json({
                success: false,
                msg: 'Passenger is not currently on a journey!'
            });
            return;
        }



    });



});




//--------------------------------- VALIDATE PASSENGER IS ON A JOURNEY ----------------------------------
router.get('/api/journey/isAvailable/:pid', function(req, res) {

    modelJourney.isJourneyAvailable(req.params.pid, function(err, journeyObj) {
        if (err) {

            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        } else {
            if (journeyObj.length > 0) {

                res.json({
                    success: true,
                    isJourneyAvailable: true,
                });

            } else {
                res.json({
                    success: true,
                    isJourneyAvailable: false,
                });

            }
        }
    });
});




//------------------------------------- ADD JOURNEY ------------------------------


router.post('/api/journey', function(req, res) {
    var journeyDetails = req.body;


    modelJourney.getLastJourneyId(function(err, lastJID) {
        if (err) {
            res.json({
                success: false,
                msg: 'Get request Fail by route!!'
            });
            return;
        } else {

            if (lastJID.length > 0) {
                lastJID = lastJID[0].jid.split("J")[1];
                lastJID = "J" + (parseInt(lastJID) + 1);
            } else {
                lastJID = "J1";
            }
            journeyDetails[0].jid = lastJID;
            setJourney();
            // res.send(journeyDetails);
        }
    })

    function setJourney() {

        modelJourney.setJourney(journeyDetails, function(err, journeyObj) {
            if (err) {

                res.json({
                    success: false,
                    msg: 'Post request Fail by route user!!'
                });
                return;
            }


            res.json({
                success: true,
                JID: journeyObj[0].jid

            });

        });

    }




});




module.exports = router;