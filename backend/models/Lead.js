const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    status: {
      type: String,
      required: true,
      enum: ["New", "Contacted", "Qualified", "Lost", "Closed"],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
