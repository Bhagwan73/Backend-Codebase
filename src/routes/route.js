const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

/***********************************user resiter *****************************/

router.post("/register", userController.register_user);
module.exports = router;
