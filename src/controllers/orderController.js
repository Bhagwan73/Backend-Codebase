const productModel = require("../models/productModel")
const userModel = require("../models/userModel")
const orderModel = require("../models/orderModel")



const createOrder = async function (req, res) {
    let data = req.body
    const { userId, productId } = data
    let user = await userModel.findById(userId)

    if (!userId) {
        return res.send({ msg: 'userId is mandatory in the request ' })

    } else if (!productId) {
        return res.send("productId is mandatory in the request ")
    }

    if (!user) {
        return res.send({ msg: "userId is invalid" })
    }
    let product = await productModel.findById(productId)
    if (!product) {
        return res.send({ msg: "productId is invalid" })
    }

    let header = req.headers.isfreeappuser //
    // let header=req.headers
    let balance = user.balance
    let price = product.price
    let value = 0 

    if (header == "true") {  //
        amount = value
        data.isFreeAppUser = header
        let savedData = await orderModel.create(data)
        res.send({ data: savedData })

    } else if (balance >= price) {
        await userModel.findOneAndUpdate({ _id: userId }, { $set: { balance: balance - price } })
        data.amount = price  //
        data.isFreeAppUser = header
        let savedData = await orderModel.create(data)
        res.send({ msg: savedData })
    } else {
        res.send({ msg: "insufficent balance" })
    }

}


module.exports = { createOrder }

