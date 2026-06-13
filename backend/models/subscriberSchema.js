//External Imports
const mongoose = require("mongoose");

//Every form submission becomes a subscriber.
const subscriberSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "customer", "lost"],
      default: "new",
    },

    tags: [String],

    notes: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    customFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true },
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = Subscriber;
