const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get("/movies/:indexNumber", function(req, res){
    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    console.log(req.params.indexNumber)
    let movieIndex = req.params.indexNumber
    //check index value. less than 0 or greater than array (length - 1) are not valid
    if(movieIndex<0 || movieIndex>=movies.length) {
        //if the index is invalid send an error message
        return res.send('The index value is not correct, Please check the it')
    }

    //if the index was valid send the movie at that index in response
    let requiredMovie = movies[movieIndex]
    res.send(requiredMovie)
})

router.get("/shoes", function(req, res){
    let queryParams = req.query
    let brand = queryParams.brand
    let discount = queryParams.discount
    let color = queryParams.color
    console.log('The brand selected is ', brand)
    console.log('The discount option selected is ', discount)
    console.log('The color selected is ', color)
    res.send("dummy response")
})

// uses query params
router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

// use path param
router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})

router.get("/films", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       //send all the films
      res.send(films) 
})

router.get("/films/:filmId", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]

       let filmId = req.params.filmId

       //iterate all the films
       //search for a film whose id matches with the id recevied in request
       for(let i = 0; i < films.length; i++){
           let film = films[i]
           if(film.id == filmId) {
               //if there is a match return the response from here
               return res.send(film)
           }
       }

       //if there is no match give an error response
       res.send("The film id doesn't match any movie")

       //====================================================================
})
router.get('/moblie',function(req,res){
    let queryParams=req.query   //{brand:samsung}
    
    let brand=queryParams.brand
    let RAM=queryParams.RAM
    let color=queryParams.color
    
   console.log( "this is the brand of"+ "  "+brand)
   console.log( "this is the RAM of"+ " "+RAM)
   console.log( "this is the color of"+ " "+color)
   res.send("dummy responce")
})
//=============================================================================

router.get('/sol1',function(req,res){
    const arr= [1,2,3,5,6,7]
    let n=arr.length+1//  6+1=7
    let sum_of_natural_no=n*(n+1)/2  //7*8/2=28  //[ n * (first + last) / 2 ]
    sum_of_arr=0;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        sum_of_arr+=element //24
    }
    let result=sum_of_natural_no-sum_of_arr  //28-24
res.send({data:result})
})


//============================================================
router.get('/sol2',function(req,res){
    let arr= [33, 34, 35, 37, 38]
    let n=arr.length+1
    let sum_No=n*(33+38)/2 //===213 // [ n * (first + last) / 2 ]
    sumOfarray=0;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        sumOfarray+=element

    }
    let result=sum_No-sumOfarray  //213-177
    res.send({data:result})

})
//===========post-api=================
router.post('/practice',function(req,res){
    let result=req.body.name
    let lastN=req.body.lastNmae
    

    res.send({data:result,lastN})
})
module.exports = router;
// adding this comment for no reason