const bookModel = require("../models/bookModel");

exports.createBook = async function (req, res) {
  try {
    let data = req.body;
    const { title, excerpt, userId, ISBN, category, subcategory } = data;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "please provide the data in request" });
    }
    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "title is mandatory in request body" });
    if (!excerpt)
      return res.status(400).send({
        status: false,
        message: "excerpt is mandatory in request body",
      });
    if (!userId)
      return res.status(400).send({
        status: false,
        message: "userId is mandatory in request body",
      });
    if (!ISBN)
      return res
        .status(400)
        .send({ status: false, message: "ISBN is mandatory in request body" });
    if (!category)
      return res.status(400).send({
        status: false,
        message: "category is mandatory in request body",
      });
    if (!subcategory)
      return res.status(400).send({
        status: false,
        message: "subcategory is mandatory in request body",
      });

    let createBook = await bookModel.create(data);
    return res.status(201).send({ status: true, data: createBook });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//***********************************get books*********************** *//

const getbooks = async function (req, res) {
  try {
    let queries = req.query;
    let result = { isDeleted: false, ...queries };
    if (!Object.keys(queries).length) {
      const data = await bookModel
        .find({ isDeleted: false })
        .sort({ title: 1 });
      if (!Object.keys(data).length) {
        return res
          .status(404)
          .send({ status: false, message: "Book not found" });
      }
      return res.status(200).send({ status: true, Data: data });
    } else {
      const data = await bookModel.find(result)
        .select({title: 1, _id: 1, excerpt: 1,userId: 1, category: 1, releasedAt: 1,reviews: 1,})
        .sort({ title: 1 });

      if (!Object.keys(data).length) {
        return res
          .status(404)
          .send({ status: false, message: "Book not found" });
      }

      return res.status(200).send({ status: true, Data: data });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.getbooks = getbooks;
