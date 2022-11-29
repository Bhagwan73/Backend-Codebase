const bookModel = require("../models/bookModel");
const { isValidObjectId } = require("../validator/validator");

//-------------------------->>-createBook-<<---------------------------<<
exports.createBook = async function (req, res) {
    try {
        let data = req.body
        const { title, excerpt, userId, ISBN, category, subcategory } = data

        //-------------->>-validation-<<----------------<<
     if(Object.keys(data).length==0){
         return res.status(400).send({status:false,message:"please provide the data in request"})
     }
        //----------->>-title..
        if (!title) return res.status(400).send({ status: false, message: "title is mandatory in request body" })
        if(!isValidString(title)) return res.status(400).send({status:false,message:"please provide the valid title"})
        let uniqueTitle=await bookModel.findOne({title:title})
        if(uniqueTitle) return res.status(400).send({ status: false, message: "this title is already exists" })

        //----------->>-excerpt..
        if (!excerpt) return res.status(400).send({ status: false, message: "excerpt is mandatory in request body" })
        if(!isValidString(excerpt)) return res.status(400).send({status:false,message:"please provide the valid excerpt"})

        //----------->>-userId..
        if (!userId) return res.status(400).send({ status: false, message: "userId is mandatory in request body" })
        if(!isValidObjectId(userId)) return res.status(400).send({status:false,message:"please provide the valid userId"})
        let ObjectId=await userModel.findById(userId)
        if(!ObjectId) return res.status(400).send({ status: false, message: "please provide the valid userId" })
        
        //----------->>-ISBN..
        if (!ISBN) return res.status(400).send({ status: false, message: "ISBN is mandatory in request body" })
        if (!isValidISBN(ISBN)) return res.status(400).send({ status: false, message: "please provide the valid ISBN"})
        let validISBN= await bookModel.findOne({ISBN:ISBN})
        if (validISBN)  return res.status(400).send({ status: false, message: "please provide the unique ISBN"})

        //----------->>-category..
        if (!category) return res.status(400).send({ status: false, message: "category is mandatory in request body" })
        if (!isValidString(category)) return res.status(400).send({ status: false, message: "please provide the valid catagory" })

        //----------->>-subcategory..
        if (!subcategory) return res.status(400).send({ status: false, message: "subcategory is mandatory in request body" })
        if (!isValidString(subcategory)) return res.status(400).send({ status: false, message: "please provide the valid subcategory" })

        //------------->>-createBook..
        let createBook = await bookModel.create(data)
        return res.status(201).send({ status: true, data: createBook })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//------------------------------->>-getBook-<<-------------------<<

const getbooks = async function(req,res){
    try{
        const queryData = req.query
        if(Object.keys(queryData).length>0){
            const data = await bookModel.find({isDeleted:false},queryData).select({title:1,_id:1,  excerpt:1, userId:1, category:1, releasedAt:1, reviews:1})
         return res.status(200).send({status:true,Data:data})

        }else{
        const data = await bookModel.find({isDeleted:false}).select({title:1,_id:1,  excerpt:1, userId:1, category:1, releasedAt:1, reviews:1})
         return res.status(200).send({status:true,Data:data})
        }
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }

}



     

const getBookById = async function(req,res){
  try {
    let bookId = req.params.bookId

    if(!bookId) return res.status(400).send({status : false , message : "bookId is required"})

    if(!isValidObjectId(bookId)) return res.status(400).send({status : false , message : "please provide valid bookId"})

    let result = {isDeleted:false , _id : bookId}
    const bookById = await bookModel.findOne(result)

    if(!bookById) return res.status(404).send({status:false , message : "Book not found with this bookId"});
    
    return res.status(200).send({status: true,message: 'Books list',data: bookById})
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });    
  }
}

module.exports = {getbooks,getBookById}
