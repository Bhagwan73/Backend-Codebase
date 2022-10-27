const authorModel = require("../models/authorModel.js")

const newbookModel = require("../models/newbookModel.js")



const createBook = async function (req, res) {
    let data = req.body
    let savedData = await newbookModel.create(data)
    res.send({ msg: savedData })
}

const getBooksbyChetanBhagat = async function (req, res) {
    let data = await authorModel.findOne({ author_name: "Chetan Bhagat" }).select({ _id: 1 })
    let savedData = await newbookModel.find({ author_id: data })
    res.send({ msg: savedData })
}

const findAuthor = async function (req, res) {
    let data = await newbookModel.findOneAndUpdate({ name: "Two states" }, { price: 100 }, { new: true })

    let savedData = await authorModel.findOne({ _id: data.author_id }).select({ author_name: 1, _id: 0 })
    res.send({ msg: savedData, data })
}

const getauthorName = async function (req, res) {
    
    let data = await newbookModel.find({ price: { $gte: 50, $lte: 100 } }).select({ author_id: 1, _id: 0 })
    let arr = []

    
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let author = element.author_id
        let savedData = await authorModel.find({ _id: author }).select({ author_name: 1, _id: 0 })
        arr.push(savedData)
    }
    res.send({ msg: arr.flat(Infinity) })
}


module.exports.createBook = createBook
module.exports.getBooksbyChetanBhagat = getBooksbyChetanBhagat
module.exports.findAuthor = findAuthor
module.exports.getauthorName = getauthorName