const userModel = require("../models/userModel");
const jwt= require("jsonwebtoken")
const {isValidString, isvalidMobile, isValidEmail, isValidPass, isValidPincode, isValidCity}=require("../validator/validator")
/******************************user register *****************************/

const register_user = async function (req, res) {
  try {
    let data = req.body;
    const { title, name, phone, email, password,address:{city,pincode} } = data;
     //------------------>>-validations-<<----------------------<<
     if(Object.keys(data).length==0){
      return res.status(400).send({status:false,message:"please provide the request body"})
     }

     //----------->>-title..
    if (!title) return res.status(400).send({ status: false, message: "title is required" });
    let titles=["Mr", "Mrs", "Miss"]
    if(!titles.includes(title)) return res.status(400).send({status:false,message:"please provide the valid title"})

    //----------->>-name..
    if (!name) return res.status(400).send({ status: false, message: "name is required" });
    if(!isValidString) return res.status(400).send({status:false,message:"please provide the valid name"})
    
    //----------->>-phone..
    if (!phone) return res.status(400).send({ status: false, message: "phone is required" });
    if(!isvalidMobile(phone)) return res.status(400).send({status:false,message:"plese provide the valid phone number"})
    let mobile=await userModel.findOne({phone:phone})
    if(mobile) return res.status(400).send({status:false,message:"this phone number is already exists"})

    //------------>>-email..
    if (!email) return res.status(400).send({ status: false, message: "email is required" });
    if(!isValidEmail) return res.status(400).send({status:false,message:"plese provide the valid emailId"})
    let emailId=await userModel.findOne({email:email})
    if(emailId) return res.status(400).send({status:false,message:"this emailId is already exists"})

    //-------------->>-password..
    if (!password) return res.status(400).send({ status: false, message: "password is required" });
    if(!isValidPass(password)) return res.status(400).send({status:false,message:"please provide the valid or strong password"})

   //--------------->>-address..
   if(pincode){
    if(!isValidPincode(pincode)) return res.status(400).send({status:false,message:"please provide the valid pincode"})
   }
   if(city){
    if(!isValidCity(city)) return res.status(400).send({status:false,message:"please provide the valid city name"})
   }

    //------------>>-createUser..
    const user = await userModel.create(data);
    return res.status(201).send({ status: true, data: user, message: "User created successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//--------------------->>-login_user-<<---------------------------<<

const userLogin = async function (req, res) {
  try {
    const data = req.body;
    const { email, password } = data;
    //---->>-validation..
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Data not found in body" })
    }
    //----->>-email..
    if (!email) return res.status(400).send({ status: false, message: "email is required" });
    if(!isValidEmail) return res.status(400).send({status:false,message:"plese provide the valid emailId"})
    let emailId=await userModel.findOne({email:email})
    if(!emailId) return res.status(400).send({status:false,message:"your account not found please create account first"})
    
    //----->>-password..
    if (!password) return res.status(400).send({ status: false, message: "password is required" });
    if(!isValidPass(password)) return res.status(400).send({status:false,message:"please provide the valid or strong password"})
  
    let getUsersData = await userModel.findOne({ email: email, password: password });
    if (!getUsersData) return res.status(401).send({ status: false, msg: "Enter a valid Email or Password" });
    
    let token = jwt.sign(
      {
        userId: getUsersData._id.toString(),
        // iat: Math.floor(Date.now() / 1000), //issue date
        // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //expires in 24 hr
      },
      "group-67",
      {expiresIn:10*60} 
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
