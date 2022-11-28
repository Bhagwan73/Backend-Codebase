const userModel = require("../models/userModel");

/******************************user register *****************************/

const register_user = async function (req, res) {
  try {
    let data = req.body;
    const { title, name, phone, email, password } = data;

    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }

    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    }

    if (!phone) {
      return res
        .status(400)
        .send({ status: false, message: "phone is required" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }

    const user = await userModel.create(data);

    return res
      .status(201)
      .send({ status: true, data: user, message: "User created successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.register_user = register_user;
