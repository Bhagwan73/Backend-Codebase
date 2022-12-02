const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel")
const { isValidObjectId, isValidISBN, isValidString, isValidDate } = require("../validator/validator");

exports.valideBookDetails = async function(req,res,next){
try{
    let data = req.body
 if (Object.keys(data).length == 0) {
   return res.status(400).send({ status: false, message: "please provide the data in request" })
 }
 //-------------->>-CHECK_THE_MANDATORY_FIELD-<<----------------<<

 let c=Object.keys(data)
 let itsMandatory=["title", "excerpt", "userId", "ISBN", "category", "subcategory", "releasedAt"]
  for (let index = 0; index < itsMandatory.length; index++) {
   const element = itsMandatory[index];
   if(!c.includes(element)){
     return res.status(400).send({status:false,message:`please enter the ${element} in request body`})
   }

   let arr=["userId","ISBN","releasedAt"]

   if(typeof req.body[element]=="string" && !arr.includes(element)){     
     if(!isValidString(req.body[element])){  
       return res.status(400).send({ status: false, message: `please provide the valid ${element}` })
     }
   }

   if(element=="title"){
   let uniqueTitle = await bookModel.findOne({ title: req.body[element] })
   if (uniqueTitle) return res.status(400).send({ status: false, message: "this title is already exists" })
   }

   if(element=="userId"){
     if(!isValidObjectId(req.body[element]))  return res.status(400).send({ status: false, message: `please provide the valid ${element}`})
     let user = await userModel.findById(req.body[element])
     if (!user) return res.status(404).send({ status: false, message: `this ${element} is not exists in a database` })
   }
   
   if(element=="ISBN"){
     if (!isValidISBN(req.body[element])) return res.status(400).send({ status: false, message: `please provide the valid ${element}` })
     let validISBN = await bookModel.findOne({ ISBN: req.body[element] })
     if (validISBN) return res.status(400).send({ status: false, message: `please provide the unique ${element}` })
   }
       
   if(element=="releasedAt"){
    if (!isValidDate(req.body[element])) return res.status(400).send({ status: false, message: `please provide the valid ${element}` })
   }
 }  
 next() 
}catch(err){
    return res.status(500).send({status:false,message:err.message})
} 

}