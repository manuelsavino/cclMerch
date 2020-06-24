require("dotenv").config();
const mongoose = require("mongoose");

const PathSchema = new mongoose.Schema({
  shortName: String,
  dimensions: String,
  path: String,
});
module.exports = mongoose.model("Path", PathSchema);
