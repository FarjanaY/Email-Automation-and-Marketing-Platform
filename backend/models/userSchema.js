//extenal imports
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter your full name."],
      trim: true,
      minlength: [3, "Name Length must be greater then 3 letters."],
      maxlength: [31, "Name length must be less then 31 letters."],
    },
    username: {
      type: String,
      required: [true, "Please enter your username."],
      trim: true,
      lowercase: true,
      unique: [
        true,
        "Username should be unique. Please enter another options.",
      ],
      minlength: [3, "Name Length must be greater then 3 letters."],
      maxlength: [31, "Name length must be less then 31 letters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      unique: [
        true,
        "Username should be unique. Please enter another options.",
      ],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
      },
      message: "Please enter a valid email.",
    },
    mobile: {
      type: String,
      required: [true, "Please enter your mobile number."],
      trim: true,
      unique: [
        true,
        "Mobile number must be unique. Please enter another options.",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      minlength: [6, "Name Length must be greater then 6 letters."],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isAdmin: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//Hashed Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//Compared Password
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
