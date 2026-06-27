//External Imports
const mongoose = require("mongoose");
const slugify = require("slugify");
const { nanoid } = require("nanoid");

const fieldSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "text",
        "email",
        "phone",
        "number",
        "textarea",
        "select",
        "checkbox",
        "radio",
        "date",
        "password",
      ],
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    placeholder: {
      type: String,
      default: "",
    },

    required: {
      type: Boolean,
      default: false,
    },

    defaultValue: {
      type: String,
      default: "",
    },

    options: [String],

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);
const formSchema = mongoose.Schema(
  {
    formTitle: {
      type: String,
      required: [true, "Please enter title."],
      trim: true,
      minlength: [3, "Title Length must be greater then 3 letters."],
      maxlength: [100, "Title length must be less then 100 letters."],
    },
    description: {
      type: String,
      default: "",
    },
    urlName: {
      type: String,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fields: [fieldSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
    totalSubmissions: {
      type: Number,
      default: 0,
    },
    publicUrl: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

//Slug or public url name create pre-middleware
formSchema.pre("save", function (next) {
  if (!this.urlName) {
    this.urlName =
      slugify(this.formTitle, { lower: true, strict: true }) + "-" + nanoid(6);
  }
  next();
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
