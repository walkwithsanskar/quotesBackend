const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
module.exports = mongoose.model("Quote", quoteSchema);
