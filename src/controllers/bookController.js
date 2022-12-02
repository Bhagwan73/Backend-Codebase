const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel")
const { isValidObjectId,isValidISBN,isValidString, isValidDate } = require("../validator/validator");

//-------------------------->>-createBook-<<---------------------------<<
const createBook = async function (req, res) {
  try {
  let data =req.body
    let createBook = await bookModel.create(data)
    return res.status(201).send({ status: true, data: createBook })
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

//------------------------------->>-getBook-<<-------------------<<

const getbooks = async function (req, res) {
  try {
    let queries = req.query;
      let result = { isDeleted: false, ...queries };
      if (!Object.keys(queries).length) {
      const data = await bookModel.find({ isDeleted: false }).sort({ title: 1 });
      if (data.length == 0) {
        return res.status(404).send({ status: false, message: "Book not found" });
      }
      return res.status(200).send({ status: true, Data: data });
    } else {
      const data = await bookModel.find(result)
        .select({title: 1, _id: 1, excerpt: 1,userId: 1, category: 1, releasedAt: 1,reviews: 1,})
        .sort({ title: 1 });

      if (data.length == 0) return res.status(404).send({ status: false, message: "Book not found" });

      return res.status(200).send({ status: true,message : "Book list", data: data });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

/***********************************get book by id********************************************/
     
const getBookById = async function(req,res){
  try {
    let bookId = req.params.bookId
    if(!bookId) return res.status(400).send({status : false , message : "bookId is required"})
    if(!isValidObjectId(bookId)) return res.status(400).send({status : false , message : "please provide valid bookId"})

    let result = {isDeleted:false , _id : bookId}
    const bookById = await bookModel.findOne(result)
    if(!bookById) return res.status(404).send({status:false , message : "Book not found with this bookId"});
    
    let books= bookById.toObject()
    let finalData = await reviewModel.find({bookId:bookId,isDeleted:false}).select({ isDeleted: 0, updatedAt: 0, createdAt: 0, __v: 0 });
    books.reviewesData = finalData;

    return res.status(200).send({status: true,message: 'Books list',data: books})
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });    
  }
}


//************update books********//

const updateBook = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide Data in body" })
    let bookId = req.params.bookId
    if (!bookId) return res.status(400).send({ status: false, message: "please provide the bookId" })
    if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "please provide the valid bookId" })
    
    let books = await bookModel.findOne({ _id: bookId, isDeleted: false })
    if (!books) return res.status(400).send({ status: false, message: "this book is not exists" })
     
    let reqData = Object.keys(data)  
    let enums = ["title", "excerpt", "releasedAt", "ISBN"]
    for (let index = 0; index < reqData.length; index++) {
      const element = reqData[index];
      if (!enums.includes(element)) {
        return res.status(400).send({ status: false, message: `book cannot update using ${element} field` })
      }
      if(element=="title"){
        let uniqueTitle=await bookModel.findOne({title:req.body[element]})  
        if(uniqueTitle) return res.status(400).send({status:false,message:`this ${element} is already exists`})
      }
      if(element=="ISBN"){
        let uniqueISBN=await bookModel.findOne({ISBN:req.body[element]})
        if(uniqueISBN) return res.status(400).send({status:false,message:`this ${element} is already exists`})
      }
    }
    let updatebook = await bookModel.findByIdAndUpdate({ _id: bookId }, data, { new: true })
    return res.status(200).send({ status: true, data: updatebook })
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}

/*****************************************delete book by Id**************************************/

const deletebookbyId= async function(req, res){
  try{
     let bookId= req.params.bookId
     if(!bookId) return res.status(400).send({status:false, message:"please provide bookId"})
     if(!isValidObjectId(bookId)) return res.status(400).send({status: false,  message :"please provide valid bookId"})
     
     const bookisdel= await bookModel.findById(bookId)
     if(!bookisdel) return res.status(400).send({status:false, message: "book from this bookId is not exists"})
     if(bookisdel.isDeleted==true) return res.status(400).send({status: false, message: "book with this bookId is already deleted"})
    
     const bookbyId= await bookModel.findOneAndUpdate({_id:bookId}, {$set:{isDeleted:true,deletedAt:new Date(Date.now())}}, {new:true})
    if(!bookbyId) return res.status(404).send({status: false,  message: "book not exists with this bookId"})
    return res.status(200).send({status:true, message: "successfully deleted", data: bookbyId })
  }catch(error){
    return res.status(500).send({status:false, message:error.message})
  }
}
module.exports = {getbooks,createBook,getBookById,updateBook,deletebookbyId}