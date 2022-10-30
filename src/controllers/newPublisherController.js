const newPublisherModel = require("../models/newPublisherModel")



const createPublisher=async function(req,res){
    let data=req.body
    let saveData=await newPublisherModel.create(data)
    res.send({msg:saveData})
}

module.exports={createPublisher}