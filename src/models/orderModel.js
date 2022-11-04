const mongoose=require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId
const date=new Date(Date.now())//
const orderSchema=new mongoose.Schema({
    userId:{
        type:ObjectId,
        required:true,
        ref:"User"
    },
	productId:{
        type:ObjectId,
        required:true,
        ref:"Product"
    },
	amount:Number,
	isFreeAppUser: Boolean, 
	date:{
        type:Date,
        default:date
    }
},{timestamps:true})

module.exports=mongoose.model('Order',orderSchema)