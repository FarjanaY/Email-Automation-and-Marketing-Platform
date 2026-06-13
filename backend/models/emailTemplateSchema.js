//external Imports
const mongoose = require("mongoose");

//for automation
const emailTemplateSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    html: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("EmailTemplate", emailTemplateSchema);
