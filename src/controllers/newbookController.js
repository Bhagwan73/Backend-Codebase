const newbookModel = require("../models/newbookModel")




const createBook=async function(req,res){
    let data=req.body
    let savedData=await newbookModel.create(data)
    res.send({msg:savedData})
}

const bookList=async function(req,res){
    let savedData=await newbookModel.find().select({bookName :1,authorName :1,_id:0})
    res.send({msg:savedData})
}
const getBooksInYear=async function(req,res){
    let savedData=await newbookModel.find({year:2016})
    res.send({msg:savedData})
}

const getParticularBooks=async function(req,res){
    let data=req.body
    let savedData=await newbookModel.find(data)
    res.send({msg:savedData})
}

const getXINRBooks=async function(req,res){
    
    let savedData=await newbookModel.find({"price.indianprice":{$in:["100INR","200INR","500INR"]}})
    res.send({msg:savedData})
}
    
const getRandomBooks =async function(req,res){
    let savedData=await newbookModel.find({$and:[{ totalPages: { $gt:  500}  },{stockAvailable:true }]})
    res.send({msg:savedData})
}



module.exports.createBook=createBook
module.exports.bookList=bookList
module.exports.getBooksInYear=getBooksInYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks=getRandomBooks