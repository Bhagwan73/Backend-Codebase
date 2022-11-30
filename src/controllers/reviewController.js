const reviewModel = require('../models/reviewModel')
const bookModel = require("../models/bookModel")
const { isValidObjectId,isValidString, isValidDate } = require("../validator/validator");

/*************************************create review***************************************/

const createReview = async function(req,res){
    try{
        const data = req.body
        const {bookId,reviewedBy,reviewedAt,rating,review} = data
        if(Object.keys(data).length==0){
            return res.status(400).send({status:false,message:"please provide some data "})
        }
        if(!bookId){
            return res.status(400).send({status:false,message:"please provide bookId"})
        }
        if(!isValidObjectId(bookId)){
            return res.status(400).send({status:false,message:"please provide valid bookId"})
        }
        let findBook=await bookModel.findById(bookId)
        if(!findBook) return res.status(400).send({ status: false, message: "book not found" })
        if(findBook.isDeleted==true){
            return res.status(400).send({status:false,message:"book is already deleted"})
        }

        if(!reviewedAt){
            return res.status(400).send({status:false,message:"please provide reviewedAt"})
        }
        if(!isValidDate(reviewedAt)){
            return res.status(400).send({status:false,message:"please provide valid reviewedAt"})
        }
        if(!rating){
            return res.status(400).send({status:false,message:"please provide rating"})
        }
        if(reviewedBy){
            if(!isValidString(reviewedBy)){
                return res.status(400).send({status:false,message:"please provide a valid  reviewedBy"})
            }
        }

        
        const reviewBook = await reviewModel.create(data)
        return res.status(201).send({status:true,message:"review created successfully",data:reviewBook})
        }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports={createReview}
