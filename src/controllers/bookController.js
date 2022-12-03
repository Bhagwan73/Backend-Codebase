const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel")
const { isValidObjectId,isValidISBN,isValidString, isValidDate } = require("../validator/validator");

//                    <<-------->>-CREATE_BOOK-<<---------->>

exports.createBook = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "please provide the data in request" })
    }
    //CHECK_THE_MANDATORY_FIELD
    let requestBody=Object.keys(data)
    let itsMandatory=["title", "excerpt", "userId", "ISBN", "category", "subcategory", "releasedAt"]
     for (let index = 0; index < itsMandatory.length; index++) {
      const element = itsMandatory[index];
      if(!requestBody.includes(element)){
        return res.status(400).send({status:false,message:`please enter the ${element} in request body`})
      }
  
      //CHECK VALIDE STRING
      let arr=["userId","ISBN","releasedAt"]
      if(typeof req.body[element]=="string" && !arr.includes(element)){     
        if(!isValidString(req.body[element])){  
          return res.status(400).send({ status: false, message: `please provide the valid ${element}` })
        }
      }
      //CHECK_UNIQUE_TITLE
      if(element=="title"){
      let uniqueTitle = await bookModel.findOne({ title: req.body[element] })
      if (uniqueTitle) return res.status(400).send({ status: false, message: "this title is already exists" })
      }
      //CHECK_VALIDE_USERID
      if(element=="userId"){
        if(!isValidObjectId(req.body[element]))  return res.status(400).send({ status: false, message: `please provide the valid ${element}`})
        let user = await userModel.findById(req.body[element])
        if (!user) return res.status(404).send({ status: false, message: `this ${element} is not exists in a database` })
      }
      //CHECK_VALIDE_ISBN
      if(element=="ISBN"){
        if (!isValidISBN(req.body[element])) return res.status(400).json({ status: false, message: `please provide the valid ${element}` })
        let validISBN = await bookModel.findOne({ ISBN: req.body[element] })
        if (validISBN) return res.status(400).send({ status: false, message: `please provide the unique ${element}` })
      }
      //CHECK_VALIDE_REALEASED_DATE  
      if(element=="releasedAt"){
       if (!isValidDate(req.body[element])) return res.status(400).json({ status: false, message: `please provide the valid ${element}` })
      }
    }  
       //CREATE BOOK DOCUMENT
    let createBook = await bookModel.create(data)
    return res.status(201).json({ status: true, data: createBook })
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message })
  }
}

//                    <<-------->>-GET_ALL_BOOKS-<<---------->>

exports.getbooks=async function (req,res){
  try{
    //IF_REQUEST_COMES_IN_REQUEST
  if(Object.keys(req.query).length>0){
    let allbooks=await bookModel.find({isDeleted:false},req.query)
    if(allbooks.length==0) return res.status(404).send({status:false,message:"book not found"})
    return res.status(200).send({status:true,data:allbooks}).select({title:1,excerpt:1,userId:1,category:1,reviews:1,releasedAt:1}).sort({ title: 1 });
  }else{
    //IF_REQUEST_NOT_COMES_IN_REQUEST
    let allbooks=await bookModel.find({isDeleted:false})
    if(allbooks.length==0) return res.status(404).send({status:false,message:"book not found"})
    return res.status(200).send({status:true,data:allbooks}).select({title:1,excerpt:1,userId:1,category:1,reviews:1,releasedAt:1}).sort({ title: 1 });
  }
}catch(err){
  return res.status(500).send({status:false,message:err.message})
}
}

//                    <<-------->>-GET_BOOKS_BY_ID-<<---------->>
     
exports.getBookById=async function(req,res){
  try{
  let bookId=req.params.bookId
  //FIND_BOOK_DOCUMENT_AND_CONVERT_THIS_DOCUMENT_TO_OBJECT_BY_USING_LEAN()
  let findBook=await bookModel.findById(bookId).lean()
  if(!findBook) return res.status(404).json({status:false,message:"book not found"})

  //FIND_ALL_REVIEW_OF_THAT_PERTICULAR_BOOK_AND_HIDE_THE_UREQUIERED_FIELD_BY_USING_SELECT()
  let review=await reviewModel.find({bookId:bookId,isDeleted:false}).select({ isDeleted: 0, updatedAt: 0, createdAt: 0, __v: 0 });

  //ADD_NEW_KEY_IN_BOOK_DOCUMENT_AND_ADD_THE_REVIEWS_AS_VALUE_OF_THIS_KEY
  findBook.reviewsData=review
  return res.status(200).json({status:true,message:"Book List" ,data:findBook})
  }catch(err){
    return res.status(500).json({status:false,message:err.message})
  }
}


//                    <<-------->>-UPDATE_BOOK-<<---------->>

exports.updateBook = async function (req, res) {
  try {
    let bookId=req.params.bookId
    let data = req.body

    //CHECK_REQEST_BODY_TAKE_ONLY_REQURED_FIELD
    let reqData = Object.keys(data)
    if(reqData.length==0) return res.status(400).send({ status: false, message: "please provide Data in body" }) 
    let enums = ["title", "excerpt", "releasedAt", "ISBN"]
    for (let index = 0; index < reqData.length; index++) {
      const element = reqData[index];
      if (!enums.includes(element)) {
        return res.status(400).send({ status: false, message: `book cannot update using ${element} field` })
      }
      //CHECK_UNIQUE_TITLE
      if(element=="title"){
        let uniqueTitle=await bookModel.findOne({title:req.body[element]})  
        if(uniqueTitle) return res.status(400).send({status:false,message:`this ${element} is already exists`})
      }
      //CHECK_UNIQUE_ISBN
      if(element=="ISBN"){
        let uniqueISBN=await bookModel.findOne({ISBN:req.body[element]})
        if(uniqueISBN) return res.status(400).send({status:false,message:`this ${element} is already exists`})
      }
    }
    //UPDATE_DATA_BY-USING_REQEST_BODY
    let updatebook = await bookModel.findByIdAndUpdate({ _id: bookId }, data, { new: true })
    return res.status(200).send({ status: true, data: updatebook })
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}

//                    <<-------->>-DELETE_BOOK-<<---------->>


exports.deletebookbyId= async function(req, res){
  try{
    let bookId=req.params.bookId
    let date=new Date(Date.now())
    //UPDATE_BOOK_DOCUMENT_FOR_DELETE_THIS_BOOK
    const bookbyId= await bookModel.findOneAndUpdate({_id:bookId}, {$set:{isDeleted:true,deletedAt:date}}, {new:true})
    return res.status(200).send({status:true, message: "successfully deleted", data: bookbyId })
    }catch(error){
    return res.status(500).send({status:false, message:error.message})
  }
}

//                          <<<===>>>-END_BOOKS_API-<<<===>>>