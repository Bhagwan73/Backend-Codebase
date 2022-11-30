const express = require("express");
const router = express.Router();
const bookController=require("../controllers/bookController")
const userController = require("../controllers/userController");
const reviewController = require("../controllers/reviewController");
const {authenticate,authorisation}= require("../middlewares/auth")

/***********************************user register *****************************/

router.post("/register", userController.register_user);

/***********************************login *************************/
router.post("/login",userController.userLogin)

/***************************************create Book**************************/

router.post("/books",authenticate,bookController.createBook)

/*****************************getbooks********************************************/

router.get("/books",authenticate,bookController.getbooks)

/**************************get Book By BookId *****************************************/

router.get("/books/:bookId",authenticate,bookController.getBookById)

/*************************update books******************************************************* */
router.put("/books/:bookId",authenticate,bookController.updateBook)

/***********************************delete books************************************ */
router.delete("/books/:bookId",authenticate,bookController.deletebookbyId)

/***********************************create review***********************************/
router.post("/books/:bookId/review",authenticate,reviewController.createReview)

/***********************************update review***********************************/
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)

module.exports = router;
