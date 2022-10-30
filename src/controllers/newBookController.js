
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const newAuthorModel = require("../models/newAuthorModel")
const newbookModel = require("../models/newbookModel")
const newPublisherModel = require("../models/newPublisherModel")



const createBook = async function (req, res) {
    let data = req.body
    const { author, publisher } = data

    if (!author) {
        res.send({ msg: "author detail is required" })
    } else if (!publisher) {
        res.send({ msg: "publisher detail is required" })
    }

    let Publisher = await newPublisherModel.findById({ _id: publisher })
    let Author = await newAuthorModel.findById({ _id: author })

    if (!Publisher) {
        res.send({ msg: "this publisher not found your database" })
    } else if (!Author) {
        res.send({ msg: "this Author not found your database" })
    } else {
        let saveData = await newbookModel.create(data)
        res.send({ msg: saveData })
    }

}

const getBookWithAllDetails = async function (req, res) {
    let saveData = await newbookModel.find().populate('author').populate('publisher')
    res.send({ msg: saveData })
}
const books = async function (req, res) {
    try {
        let saveData = await newPublisherModel.find({ $or: [{ name: 'Penguin' }, { name: 'HarperCollins' }] }).select({ _id: 1 })
        let arr = []
        for (let index = 0; index < saveData.length; index++) {
            const element = saveData[index];
            let id = element._id
            let book = await newbookModel.updateMany({ publisher: id }, { isHardCover: true })
            arr.push(book)
        }
        res.send({ msg: arr })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
}

const updateBook = async function (req, res) {
    let saveData = await newAuthorModel.find({ rating: { $gt: 3.5 } }).select({ _id: 1 })
    let arr = []
    for (let index = 0; index < saveData.length; index++) {
        const element = saveData[index];
        let id = element._id
        let book = await newbookModel.updateMany({ author: id }, { price: 60 })
        arr.push(book)
    }
    res.send({ msg: arr })

}

module.exports = { createBook, getBookWithAllDetails, books, updateBook }