const mongoose = require("mongoose");
const User = require("./Users");

const SummarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalText: {
      type: String,
      required: true,
    },
    summarizedText: {
      type: String,
      required: true, 
    },
    tone: {
      type: String,
      default: "neutral",
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Summary", SummarySchema);
