const mongoose = require('mongoose');

const newbookSchema= new mongoose.Schema( {
    name: String, 
    author_id: {
        type:mongoose.Schema.ObjectId,//
        required:true   
    } ,
    price:Number,
    ratings:Number
    
}, { timestamps: true });


module.exports = mongoose.model('Newbook-2',newbookSchema)