const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const { authenticate, authorise } = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createusers", userController.createUser)
router.post("/loginUser", userController.loginUser)

//The userId is sent by front end

router.get("/users/:userId", authenticate, authorise, userController.getUserData)
router.post("/users/:userId/posts", authenticate, authorise, userController.postMessage)
router.put("/users/:userId", authenticate, authorise, userController.updateUser)
router.delete('/users/:userId', authenticate, authorise, userController.deleteUser)


//
router.all("/*", function (req, res) {
    return res.status(404).send({ status: false, msg: "path is not correct" })
})

module.exports = router;