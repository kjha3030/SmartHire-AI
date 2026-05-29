const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

  atsScore: Number,

  detectedSkills: [String],

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Resume", resumeSchema);