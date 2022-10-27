const mongoose=require("mongoose")

const authorModel=new mongoose.Schema({

    author_name:String,
    age:Number,
    address:String

},{timestamps: true})

module.exports=mongoose.model('Author',authorModel)