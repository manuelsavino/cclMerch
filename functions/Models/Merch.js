const mongoose = require("mongoose");

const MerchSchema = new mongoose.Schema({
  desktopImage: String,
  mobileImage: String,
  tags: [String],
  liveDate: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Merch", MerchSchema);
