const express = require("express");
const router = express.Router();
const bookController=require("../controllers/bookController")
const userController = require("../controllers/userController");
const reviewController = require("../controllers/reviewController");
const {authenticate,authorisation,isValidBookId} = require("../middlewares/auth");

//                       <<<===>>>-USERS_API-<<<===>>>
// [1].CREATE_USER_DOCUMENT
router.post("/register", userController.createUser);
// [2].LOGIN_USER_WITH_THEIR_EMAIL_OR_PASSWORD
router.post("/login",userController.userLogin)


//                       <<<===>>>-BOOKS_API-<<<===>>>
// [1].CRETE_BOOK_DOCUMENT
router.post("/books",authenticate,bookController.createBook)
// [2].GET_ALL_BOOKS
router.get("/books",authenticate,bookController.getbooks)
// [3].GET_BOOK_BY_ID
router.get("/books/:bookId",authenticate,authorisation,bookController.getBookById)
// [4].UPDATE_BOOK_DOCUMENT
router.put("/books/:bookId",authenticate,authorisation,bookController.updateBook)
// [5].DELETE_BOOK_DOCUMENT_BY_USING_BOOK_ID
router.delete("/books/:bookId",authenticate,authorisation,bookController.deletebookbyId)

//                       <<<===>>>-REVIEWS_API-<<<===>>>   
// [1].CREATE_REVIEW_DOCUMENT
router.post("/books/:bookId/review",isValidBookId,reviewController.createReview)
// [2].UPDATE_REVIEW_DOCUMENT
router.put("/books/:bookId/review/:reviewId",isValidBookId,reviewController.updateReview)
// [3].DELETE_REVIEW_DOCUMENT
router.delete("/books/:bookId/review/:reviewId",isValidBookId,reviewController.deleteReview)

//ERROR_HANDLING_ROUTE
router.all("/*", function(req, res,){
    res.status(404).json({status: false, msg: `can not fond ${req.originalUrl} url on this server`,});
  });
  
module.exports = router;
