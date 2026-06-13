//External Imports
const mongoose = require("mongoose");

/*Tracks CRM(Customer Relation Management) actions
{ action: "FORM_SUBMITTED";}
{action: "EMAIL_SENT";}
{action: "STATUS_CHANGED";}*/

const activitySchema = new mongoose.Schema(
  {
    subscriberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriber",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    action: {
      type: String,
      required: true,
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
