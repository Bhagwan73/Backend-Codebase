const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const {auth}=require("../midlewears/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createusers", userController.createUser  )

router.post("/loginUser", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",auth, userController.getUserData)

router.put("/users/:userId",auth, userController.updateUser)

router.delete("/users/:userId",auth,userController.deleteuser)  

module.exports = router;  