const express = require('express');
const router = express.Router();
const CowinController = require("../controllers/cowinController")
const CowinController2 = require("../controllers/cowinController2")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

router.get("/cowin/getByDistricts", CowinController2.getByDistricts)
router.get("/checkweather", CowinController2.checkweather)
router.get("/createMemes", CowinController2.createMemes)
module.exports = router;