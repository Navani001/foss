const mongoose = require("mongoose");
module.exports = mongoose.model("Task", new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "MEDIUM" },
  completed: { type: Boolean, default: false },
}, { timestamps: true }));