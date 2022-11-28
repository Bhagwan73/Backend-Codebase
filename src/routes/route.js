const express = require("express");
const router = express.Router();
const bookController=require("../controllers/bookController")
const userController = require("../controllers/userController");

/***********************************user resiter *****************************/

router.post("/register", userController.register_user);

/***************************************create Book**************************/

router.post("books",bookController.createBook)


module.exports = router;
