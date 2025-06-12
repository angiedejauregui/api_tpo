const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  modality: {
    type: String,
    enum: ['Presencial', 'Virtual'],
    required: true
  },
  schedule: [
    {
      day: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true }     
    }
  ],
  language: { type: String },
  location: { type: String, required: true },
  capacity: { type: Number },
  attachmentLink: { type: String },
  images: [String]
}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);

