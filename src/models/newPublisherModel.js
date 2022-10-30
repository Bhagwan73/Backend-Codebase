const mongoose=require("mongoose")

const newPublisherchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
      headQuarter: String

},{timestamps:true})

module.exports=mongoose.model('newPublisher',newPublisherchema)