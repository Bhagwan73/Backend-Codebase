const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {isValidString,isvalidMobile,isValidPincode,isValidCity,isValidEmail,isValidPass} = require("../validator/validator");



//                    <<-------->>-CREATE_USER-<<---------->>

exports.createUser = async function (req, res) {
  try {
//                    <<-------->>-VALIDATIONS-<<---------->>

    let data = req.body;
    //TAKE_ALL_KEYS_OF_REQUEST_BODY_IN_ARRAY
    let requestBody=Object.keys(data)
    if(requestBody.length==0) return res.status(400).send({ status: false, message: "please provide the request body" });

    //CHECK_ALL_MANDATORY_FIELDS_IS_EXISTS_OR_NOT_IN_REQUEST_BODY
    let itsMandatory=["title", "name", "phone", "email", "password"]
    for (let index = 0; index < itsMandatory.length; index++) {
      const element = itsMandatory[index];
      if(!requestBody.includes(element)) return res.status(400).send({status:false,message:`please provide the ${element} in request body`})
    //CHECK_TITLE_VALIDATION
      if(element=="title"){
        let enums=["Mr", "Mrs", "Miss"]
         if(!enums.includes(req.body[element])) return res.status(400).send({status: false, message: `please provide the valid ${element} Mr or Mrs or Miss `})
      }
    //CHECK_NAME_VALIDATION
      if(element=="name"){
       if (!isValidString(req.body[element])) return res.status(400).send({ status: false, message: "please provide the valid name" });
       
      }
     //CHECK_PHONE_VALIDATION
      if(element=="phone"){
       if (!isvalidMobile(req.body[element])) return res.status(400).send({status: false, message: `plese provide the valid ${element}`});
       let mobile = await userModel.findOne({ phone: req.body[element] });
       if (mobile) return res.status(400).send({status: false,message:`${req.body[element]} number is already exists`});
      }
      //CHECK_EMAIL_VALIDATON
      if(element=="email"){
        if(!isValidEmail(req.body[element])) return res.status(400).send({status:false,message:`please provide the valid ${element}`})
         let emailId = await userModel.findOne({ email: req.body[element] ,isDeleted:false});
        if (emailId) return res.status(400).send({ status: false, message: "this emailId is already exists" });

      }
      //CHECK_PASSWORD_VALIDATION
      if(element=="password"){
        if(!isValidPass(req.body[element])){
          return res.status(400).send({status:false,message:`please provide the valid ${element}`})
      }
    }
  }
  //THESE_FIELDE_IS_NOT_MANDATORY
  const {address,address:{pincode,city}} =data
  if(address){
    if(pincode){
      if(!isValidPincode(pincode)) return res.status(400).send({status:false,message:"please provide the valid pincode"})
    }
    if(city){
      if(!isValidCity(city)) return res.status(400).send({status:false,message:"please provide the valid city"})
    }
  }

//                    <<-------->>-CREATE_USER_DOCUMENT-<<---------->>
    const user = await userModel.create(data);
    return res.status(201).send({ status: true, message: "User created successfully" ,data: user});

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



//                    <<-------->>-LOGIN_USER-<<---------->>

exports.userLogin = async function (req, res) {
  try {
    const data = req.body;
    const { email, password } = data;
    if(!email || !password) return res.status(400).send({ status: false, message: "email and password is required" })
    //VALIDATE EMAIL OR PASS USING VALIDATOR
    if(!isValidEmail(email)) return res.status(400).send({status:false,message:`please provide the valid email`})
    if(!isValidPass(password)) return res.status(400).send({status:false,message:"please provide valid password"})
    //CHECK USER EXIST OR NOT OUR DATABASE
    let getUsersData = await userModel.findOne({email: email,password: password});
    if (!getUsersData) return res.status(401).send({ status: false, message: "Enter a valid Email or Password" });
    //CREATE TOKEN 
     const payload={userId: getUsersData._id.toString()}
     const setExpiry={ expiresIn: 30*60 }
     const secreteKey="Project_Book_Management"
    let token = jwt.sign( payload ,secreteKey,setExpiry)
    //SET HEADER IN RESPONCE
    res.setHeader("x-api-key", token);
    
    return res.status(200).send({status: true,message: "Success",data: { userId:payload.user, token: token }});
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};
