//External Imports
const mongoose = require("mongoose");

//Stores email campaign = one email message that is sent to one or more subscribers.
const campaignSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    subscriberCount: {
      type: Number,
      default: 0,
    },

    sentCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "scheduled", "sent"],
      default: "draft",
    },

    scheduledAt: Date,

    sentAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Campaign", campaignSchema);
