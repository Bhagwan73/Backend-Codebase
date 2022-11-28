
const bookModel = require("../models/bookModel")

exports.createBook = async function (req, res) {
    try {
        let data = req.body
        const { title, excerpt, userId, ISBN, category, subcategory } = data
     if(Object.keys(data).length==0){
         return res.status(400).send({status:false,message:"please provide the data in request"})
     }
        if (!title) return res.status(400).send({ status: false, message: "tile is mandatory in request body" })
        if (!excerpt) return res.status(400).send({ status: false, message: "experts is mandatory in request body" })
        if (!userId) return res.status(400).send({ status: false, message: "userId is mandatory in request body" })
        if (!ISBN) return res.status(400).send({ status: false, message: "ISBN is mandatory in request body" })
        if (!category) return res.status(400).send({ status: false, message: "category is mandatory in request body" })
        if (!subcategory) return res.status(400).send({ status: false, message: "subcategory is mandatory in request body" })

        let createBook = await bookModel.create(data)
        return res.status(201).send({ status: true, data: createBook })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}