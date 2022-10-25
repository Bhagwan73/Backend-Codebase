const mongoose=require("mongoose")

const nebookSchema =new mongoose.Schema({
    bookName:{
        type:String,
        required:true                    
    },
    price :{
        indianPrice:String,
        europeanPrice:String
    },  
    year:{
        type:Number,
        default:2021
    },
    tags :[String],
    authorName:String,
    totalPages :Number,
    stockAvailable :Boolean          
},{timestamps:true})   
   
module.exports = mongoose.model ('Newbook', nebookSchema)