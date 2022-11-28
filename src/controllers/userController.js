const userModel = require("../models/userModel");
const jwt= require("jsonwebtoken")

/******************************user register *****************************/

const register_user = async function (req, res) {
  try {
    let data = req.body;
    const { title, name, phone, email, password } = data;

    if (!title) return res.status(400).send({ status: false, message: "title is required" });

    if (!name) return res.status(400).send({ status: false, message: "name is required" });

    if (!phone) return res.status(400).send({ status: false, message: "phone is required" });

    if (!email) return res.status(400).send({ status: false, message: "email is required" });

    if (!password) return res.status(400).send({ status: false, message: "password is required" });

    const user = await userModel.create(data);
    return res.status(201).send({ status: true, data: user, message: "User created successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


const userLogin = async function (req, res) {
  try {
    const data = req.body;
    const { email, password } = data;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Data not found in body" })
    }
    if (!email) return res.status(400).send({ status: false, message: "Please provide email" })
    
    if (!password) return res.status(400).send({ status: false, message: "Please provide password" })
  
    let getUsersData = await userModel.findOne({ email: email, password: password });
    if (!getUsersData) return res.status(401).send({ status: false, msg: "Enter a valid Email or Password" });
    
    let token = jwt.sign(
      {
        userId: getUsersData._id.toString(),
        iat: Math.floor(Date.now() / 1000), //issue date
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //expires in 24 hr
      },
      "group-67"
    );
    // console.log(token);
    res.setHeader("x-api-key", token);

    return res.status(200).send({ status: true, message: "Success", data: { userId: getUsersData._id, token: token } });
    // console.log(token);
  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }
}


module.exports.register_user = register_user;
module.exports.userLogin=userLogin
