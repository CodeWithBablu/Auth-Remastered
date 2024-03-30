const mongoose = require("mongoose");

const mongodbUrl = process.env.MONGO_URL;

mongoose
  .connect(mongodbUrl)
  .then(() => console.log("MongoDB started..."))
  .catch((err) => console.log("Connection error : ", err));
