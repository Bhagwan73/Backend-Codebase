const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const newbookController=require("../controllers/newbookController")

router.get("/test-me", function (req, res) { // 
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)


//================= ASSIGNMENT-API =================================><>

router.post("/createnewBooks",newbookController.createBook)
router.get("/bookList", newbookController.bookList)
router.post("/getBooksInYear",newbookController.getBooksInYear)
router.get("/getParticularBooks",newbookController.getParticularBooks)
router.get("/getXINRBooks",newbookController.getXINRBooks)
router.get("/getRandomBooks",newbookController.getRandomBooks)

module.exports = router;