const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/
const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = abcd.body;
  let savedData = await userModel.create(data);
  // console.log(abcd.newAtribute);
  xyz.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  if(!userName || !password){
    return res.send({status:false , msg:"userName and password is mendatory in request body"})
  }

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret (This is basically a fixed value only set at the server. This value should be hard to guess)
  // The same secret will be used to decode tokens 
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "lithium",
      organisation: "FunctionUp",
    },
    "functionup-plutonium-very-very-secret-key"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
 
  res.send({ status: true, data: userDetails });
  }catch(err){  
    return res.send({msg:err.message})  
  }  
};  

const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);

  return res.send({ status: true, data: updatedUser });  
};

const deleteuser=async function(req,res){
  try{
  let userId = req.params.userId;
  let savedData=await userModel.updateOne({_id:userId},{$set:{isDeleted:true}},{new:true})

  res.status(201).send({status:true,data:savedData})
  }catch(err){
    return res.status(404).send({status:false,msg:err.message})
  }
}
module.exports.createUser = createUser;  
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;          
module.exports.loginUser = loginUser;
module.exports.deleteuser=deleteuser
