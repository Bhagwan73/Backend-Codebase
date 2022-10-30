const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")

const newBookController=require("../controllers/newBookController")
const newAuthorController=require("../controllers/newAuthorController")
const newPublisherController=require("../controllers/newPublisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)


//========================//ASSIGNMENT//====================//

router.post('/createAuthors',newAuthorController.createAuthor)
router.post('/createPublisher',newPublisherController.createPublisher)
router.post('/createBooks',newBookController.createBook)
router.get('/getBooks',newBookController.getBookWithAllDetails)
router.put('/books',newBookController.books)
router.put('/updateBook',newBookController.updateBook)

module.exports = router;