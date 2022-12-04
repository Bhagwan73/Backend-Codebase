const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");
const { isValidObjectId } = require("../validator/validator");

//                    <<-------->>-AUTHENTICATION-<<---------->>

exports.authenticate = function (req, res, next) {
  try {
    //CHECK_TOKEN_IS_EXISTS_OR_NOT_IN_REQUEST_HEADERS  
    let token = req.headers["x-api-key"] || req.headers["X-Api-Key"];
    if (!token) return res.status(400).send({ status: false, message: "token must be present" });
    //VERIFY_THE_TOKEN
    jwt.verify( token,"Project_Book_Management",{ ignoreExpiration: true },
    //WRITE_FUNCTION_FOR_IF_GET_ERROR_IN_VERIFYING_PROCESS_SO_PUT_ERROR_IN_ERR_PARAMETER_AND_IF_TOKEN_CREATED_SUCESSFULLY_SO_PUT_VALUE_IN_DECODEDTOKEN_PARAMETER
      function (err, decodedToken) {
        if (err) {
          return res.status(401).send({ status: false, message: err.message});
        }
      //CHECK_TOKEN_IS_EXPIRED_OR_NOT
        if (Date.now() > decodedToken.exp * 1000) {
          return res.status(400).send({ status: false, message: "token expired" });
        }
      //SET_ATTRIBUTE_IN_REQUEST
        req.tokenId = decodedToken.userId;
        next();
      }
    );
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//                    <<-------->>-AUTHORISATION-<<---------->>

exports.authorisation = async function (req, res, next) {
  try{
  //CHECK_VALID_BOOK_ID_IN_PARAMS
  let bookId = req.params.bookId;
  if (!bookId) return res.status(400).send({ status: false, message: "please provide the bookId" });
  if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "please provide the valid bookId" });

  //CHECK_BOOK_IS_EXISTS_OR_NOT_IN_OUR_DATABASE
  let book = await bookModel.findOne({_id:bookId,isDeleted:false});
  if (!book) return res.status(400).send({ status: false, message: "this book is not exists" });
  //GET_USER_ID_FROM_BOOK_DOCUMENT
  let userid = book.userId;
  //GET_USER_ID_FROM_REQUEST_ATTRIBUTE
  let userId = req.tokenId;
  //CHECK_USERS_AUTHERITIES
  if (userid != userId){
     return res.status(400).send({ status: false, message: "unauthorised user!" });
  }else{
  next();
  }
}catch(err){
  res.status(500).send({ status: false, message: err.message });
}
};


//            <<-------->>-CHECK_VALID_BOOK_ID_FOR_CREATE_REVIEWS-<<---------->>

exports.isValidBookId=async function(req,res,next){
  try{
  //CHECK_VALID_BOOK_ID_IN_PARAMS
  let bookId = req.params.bookId;
  if (!bookId) return res.status(400).send({ status: false, message: "please provide the bookId" });
  if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "please provide the valid bookId" });

  //CHECK_BOOK_IS_EXISTS_OR_NOT_IN_OUR_DATABASE
  let book = await bookModel.findOne({_id:bookId,isDeleted:false});
  if (!book) return res.status(400).send({ status: false, message: "this book is not exists" });
  next()
  }catch(err){
    return res.status(500).json({status:false,message:err.message})
  }

}