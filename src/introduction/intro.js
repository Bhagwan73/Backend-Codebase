const router = require("../routes/route")

const batchName = "Plutonium"

let printName = function() {
    console.log('Bathc name is ', batchName)
}
//=================================================
let movie=function(req,res){   // anonums function
    const movies=["Rang de basanti","The shining","Lord of the rings","Batman begins"]
    res.send(movies)
}
//===================================================
let movie2=function(req,res){
     let param=req.params.indexNumber//
    const movies=["Rang de basanti","The shining","Lord of the rings","Batman begins"]
   let a=movies[param]
    if(movies.length > param ){
        res.send(a)
    }else{
        res.send("this data is not valid")
    }
}

//==================================================================
let filmes=function(req,res){
    const films=[ {
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
       res.send(films)
    
}
//==========================================================
let film=function(req,res){
    
    const films=[ {
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
       let param=req.params.filmId
       let a=films[param-1]
       if(films.length > param-1 ){
           res.send(a)
       }else{
           res.send("this data is not valid")
       }
    //    let movie=films.find(a=>a.id=param)

    //    if(movie){
    //     res.send(movie)
    //    }else{
    //     res.send("this data is not valid")
    //    }
}
//========================================================
module.exports.ass4=film
module.exports.ass3=filmes
module.exports.ass2=movie2
module.exports.ass=movie

module.exports.name = batchName
module.exports.printName = printName

// module.exports={film,filmes,movie2,movie,batchName,printName}
