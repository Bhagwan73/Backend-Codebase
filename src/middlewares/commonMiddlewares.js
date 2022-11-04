
const mid1= function ( req, res, next) {
    req.falana= "hi there. i am adding something new to the req object"
    console.log("Hi I am a middleware named Mid1")
    next()
}
const myOtherMiddleware = function(req, res, next){
    // Setting an attribute 'wantsJson' in request
    // The header value comparison is done once and
    // the result can be used directly wherever required.
    let acceptHeaderValue = req.headers["accept"]

    if(acceptHeaderValue == "application/json") {
        req.wantsJson = true
    } else {
        req.wantsJson = false
    }
    next()
}

const checkHeader=function(req,res,next){
    let header=req.headers.isfreeappuser
    if(!header){
       res.send({msg:"the request is missing a mandatory header"}) 
    }else{
    //    req.headers= header=="true"? true : false
        next()  
    }

}


module.exports={checkHeader,mid1,myOtherMiddleware}



