const express = require("express");
const router = express.Router();
const bookController=require("../controllers/bookController")
const userController = require("../controllers/userController");

/***********************************user resiter *****************************/

router.post("/register", userController.register_user);

/***********************************login *************************/
router.post("/login",userController.userLogin)

/***************************************create Book**************************/

router.post("/books",bookController.createBook)

/*****************************getbooks********************************************/

router.get("/books",bookController.getbooks)

/**************************get Book By BookId *****************************************/

router.get("/books/:bookId",bookController.getBookById)

module.exports = router;
