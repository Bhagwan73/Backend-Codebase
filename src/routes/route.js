const express = require("express");
const router = express.Router();
const bookController=require("../controllers/bookController")
const userController = require("../controllers/userController");

/***********************************user resiter *****************************/

router.post("/register", userController.register_user);

/***************************************create Book**************************/

router.post("/books",bookController.createBook)

/*****************************getbooks**********************/

router.get("/books",bookController.getbooks)
router.post("/login",userController.userLogin)
module.exports = router;
