const express = require('express');
const router = express.Router();///test-you


//=======================IMPORTING CUSTOM MODULE====================//

const xyz = require('../logger/logger')
const util = require("../util/helper")
const validator = require("../validator/formatter")

//================================================================//

//importing external package
const underscore = require('underscore')
router.get('/test-me', function (req, res) {
    //Calling the components of a different custom module
    console.log("Calling my function ", xyz.myFunction())
    console.log("The value of the constant is ", xyz.myUrl)
    //Trying to use an external package called underscore
    let myArray = ['Akash', 'Pritesh', 'Sabiha']
    let result = underscore.first(myArray)
    console.log("The result of underscores examples api is : ", result)

    //========================/Assignment/===============================//

    console.log(" PROBLEM NO: 1 ------->", xyz.welcome())
    console.log(" PROBLEM NO: 2 ------->", util.helper(), util.Batch())
    console.log(" PROBLEM NO: 3 ------->", validator.trimfunction())
    console.log(" PROBLEM NO: 4 ------->", validator.lodashpackage())

    //=====================================================================//

    res.send('My first ever api!')

    //To be tried what happens if we send multiple response
    //res.send('My second api!')
});



module.exports = router;

