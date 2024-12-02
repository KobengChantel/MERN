const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
      default: "Title here",
      maxlength: 50,
    },
    notes: {
      type: String,
      maxlength: 200,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Note", noteSchema)
