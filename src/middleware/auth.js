const jwt=require("jsonwebtoken")

const authenticate = function(req, res, next) {
    let token=req.headers["x-auth-token"]
     req.token=token  //
    if(!token){
        return res.status(401).send({status:false,msg:"token must be present"})
    }else{
        next()
    }
}   


const authorise = function(req, res, next) {  
    // comapre the logged in user's id and the id in request
  try{
    let isValidtoken=jwt.verify(req.token,"jay shree ram")
    if(!isValidtoken){
        return res.status(403).send({status:false,msg:"this is not valid user"})
    }else{
    next()
    }
}catch(err){
    return res.status(500).send({status:false,msg:err.message})
}
}


module.exports={authenticate,authorise}