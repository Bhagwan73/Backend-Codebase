const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")


const createUser = async function (req, res) {
  try {
    let data = req.body
    let saveData = await userModel.create(data)
    return res.status(201).send({ status: true, msg: saveData })
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}

const loginUser = async function (req, res) {
  try {
    const { emailId, password } = req.body
    let checkValidation = await userModel.findOne({ emailId: emailId, password: password })

    if (!checkValidation) {
      res.status(401).send({ status: false, msg: " user not found please create account first" })
    }

    let payload = {
      studentName: "Bhagwan",
      batchName: "Lithium"
    }
    let token = jwt.sign(payload, "jay shree ram")
    res.setHeader("x-auth-token", token)
    res.status(200).send({ status: true })
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      return res.status(401).send({ status: false, msg: "user not found" })
    } else {
      res.status(200).send({ status: true, data: user })
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}

const postMessage = async function (req, res) {
  try {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      res.status(401).send({ status: false, msg: "user not found " })
    }

    let post = user.posts
    let addPost = req.body.post
    post.push(addPost)
    let updateUser = await userModel.findByIdAndUpdate({ _id: userId }, { posts: post }, { new: true })
    res.status(200).send({ status: true, data: updateUser })
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}

const updateUser = async function (req, res) {
  try {
    let data = req.body
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      return res.status(401).send({ status: false, msg: "user not found" })
    } else {
      let updateUser = await userModel.findByIdAndUpdate({ _id: userId }, data)
      return res.status(200).send({ status: true, msg: updateUser })
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }

}


const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).send({ status: false, msg: "user not found" })
    }

    let deletedData = await userModel.findByIdAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true })
    return res.status(201).send({ status: true, msg: deletedData })
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}

module.exports = { createUser, loginUser, getUserData, postMessage, updateUser, deleteUser }
