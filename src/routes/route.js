const express = require('express');
const abc = require('../introduction/intro')///custom module
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()

    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})

router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use many ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})



router.get('/movies',abc.ass)
router.get('/movies/:indexNumber',abc.ass2)
router.get('/films',abc.ass3)
router.get('/films/:filmId',abc.ass4)

/*params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object .where key is the variable defined in code 
    and value is what is sent in the request
*/
module.exports = router;