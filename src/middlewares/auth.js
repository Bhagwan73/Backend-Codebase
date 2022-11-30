const jwt = require("jsonwebtoken");
let decodedtoken;

exports.authenticate = function(req, res, next){
    try{
        let token = req.headers["x-api-key"] || req.headers["X-Api-Key"];
        if(!token) return res.status(400).send({status: false, message: "token must be present"});

        decodedtoken =jwt.verify(token, "Book-mgmt" , function(err, token){
            if(err) {
                return res.status(401).send({status: false, message: err.message})
            }else{
                return token;
            }
        })
        req.tokenId=decodedtoken.userId
        next();

    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
}


