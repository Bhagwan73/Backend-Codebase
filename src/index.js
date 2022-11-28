const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require("./routes/route");
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://PriyankaChavan:priyanka@cluster0.iocf9uz.mongodb.net/group29Database",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Project3 mongoDB connected");
  })
  .catch((errors) => {
    console.log(errors.message);
  });

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("express running on PORT " + (process.env.PORT || 3000));
});
