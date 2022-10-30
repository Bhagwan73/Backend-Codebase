const newAuthorModel = require("../models/newAuthorModel")



const createAuthor=async function(req,res){
    let data=req.body
    let saveData=await newAuthorModel.create(data)
    res.send({msg:saveData})
}



module.exports= {createAuthor}