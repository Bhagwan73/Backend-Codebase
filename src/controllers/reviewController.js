const reviewModel = require('../models/reviewModel')
const bookModel = require("../models/bookModel")
const { isValidObjectId,isValidString,isValidRating } = require("../validator/validator");

//                    <<-------->>-CREATE_REVIEW-<<---------->>

exports.createReview = async function(req,res){
    try{
        const data = req.body
        let book_id=req.params.bookId
        const {reviewedBy,rating,review} = data
        if(Object.keys(data).length==0) return res.status(400).send({status:false,message:"please provide some data "})
        //CHECK_VALIDATION_FOR_RATINGS
        if(!rating) return res.status(400).send({status:false,message:"please provide rating"})
        if(!isValidRating(rating)) return res.status(400).send({status :false , message : "please provide rating in between 1 to 5"})
        //CHECK_VALIDATION_FOR_REVIEWEDBY
        if(!reviewedBy) return res.status(400).send({status:false,message:"please provide rating"})
        if(!isValidString(reviewedBy)) return res.status(400).send({status:false,message:"please provide a valid  reviewedBy"})
        //THIS_FIELD_IS_NOT_MANDATORY
        if(review){
            if(!isValidString(review))  return res.status(400).send({status :false , message : "please provide the valid review"})
        }
        //ADD_TWO_KEYS_IN_REQUEST_BODY
        data.bookId=book_id
        data.reviewedAt=new Date(Date.now())
        //CREATE_REVIEW
        const reviewBook = await reviewModel.create(data)
        //UPDATE_BOOK_WITH_REVIEW_DETAILS(INCREASE_REVIEW_BY_1)
        let updateData = await bookModel.findOneAndUpdate({ _id:book_id },{ $inc: { reviews: 1 }}, { new: true }).lean()
        //CREATE_NEW_REVIEW_OBJECT(HIDE_SOME_FIELDS)
        let reviews={
            _id:reviewBook._id,
            bookId:reviewBook.bookId,
            reviewedBy:reviewBook.reviewedBy,
            reviewedAt:reviewBook.reviewedAt,
            rating:reviewBook.rating,
            review:reviewBook.review
        }
        //ADD_NEW_KEY_IN_BOOK_DOCUMENT
        updateData.reviewsData = [reviews]
        return res.status(201).send({status:true,message:"review created successfully",data:updateData})
        }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

//                    <<-------->>-UPDATE_REVIEW-<<---------->>

exports.updateReview = async function(req,res){
    try {
        let data = req.body
        const {review, rating, reviewedBy} = data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide Data" })
        const {bookId,reviewId} = req.params
        //CHECK_VALID_REVIEWED_ID
        if (!reviewId) return res.status(400).send({ status: false, message: "please provide reviewId" })
        if(!isValidObjectId(reviewId)) return res.status(400).send({status : false , message : "please provide valid reviewId"})
        //CHECK_REVIEW_EXIST_OR_NOT_IN_OUR_DATABASE
        const findReview = await reviewModel.findOne({_id:reviewId,bookId:bookId,isDeleted:false})
        if (!findReview) return res.status(404).send({ status: false, message: "review not found of that perticular book" })
        //CHECK_VALID_REVIEW
        if(review){
            if(!isValidString(review)) return res.status(400).send({status :false , message : "please provide valid review"})
        }
       //CHECK_VALID_REVIIWEDBY
        if(reviewedBy){  
            if(!isValidString(reviewedBy)) return res.status(400).send({status :false , message : "please provide valid reviewer name"})
        }
       //CHECK_VALID_RATING
        if(rating){
            if(!isValidRating(rating)) return res.status(400).send({status :false , message : "please provide rating in between 1 to 5"})
        }
        //UPDATE_REVIEW_DOCUMENT
        const updatedReview = await reviewModel.findOneAndUpdate({ _id:reviewId },data, { new: true }).select({createdAt:0,updatedAt:0,isDeleted:0})
        const book=await bookModel.findById(bookId).lean()
        //ADD_NEW_KEY_IN_BOOK_DOCUMENT
        book.reviewsData=[updatedReview]
        return res.status(200).send({ status: true, message: "successfully updated", data: book })
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})        
    }
}


//                    <<-------->>-DELETE_REVIEW-<<---------->>

exports.deleteReview =async function(req,res){
    try{
    const{bookId,reviewId}=req.params
    //CHECK_VALIDE_REVIEW_ID
    if(!reviewId) return res.status(400).send({status:false,message:"please provide the reviewId"})
    if(!isValidObjectId(reviewId)) return res.status(400).send({status:false,message:"this reviewId is not exists"})
    //CHECK_THIS_REVIEW_IS_THAT_BOOKS_REVIEW_OR_NOT
    let review=await reviewModel.findOne({_id:reviewId,bookId:bookId,isDeleted:false})
    if(!review) return res.status(404).send({status:false,message:"this review is not exists"})
    //UPDATE_REVIEW_DOCUMENT(DELETE_REVIEW)
    const reviewBook = await reviewModel.findOneAndUpdate({_id:reviewId}, {$set:{isDeleted:true,deletedAt:new Date(Date.now())}}, {new:true})
    //UPDATE_BOOK_DOCUMENT
    let updateData = await bookModel.findOneAndUpdate({ _id: bookId},{ $inc: { reviews: -1 } }, { new: true }).lean()
    //ADD_NEW_KEY_IN_BOOK_DOCUMENT
    updateData.reviewsData = [reviewBook]
    return res.status(200).send({status:true, message: "successfully deleted", data: updateData })
    }catch(err){
        return res.status(500).send({status : false , message : err.message})        
    }
}

//                          <<<===>>>-END_REVIEWS_API-<<<===>>>


