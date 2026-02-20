//External imports
const { check } = require("express-validator");
const createError = require("http-errors");

//Internal Imports
const User = require("../models/userSchema");
const {
  slugifyName,
  generateUsername,
} = require("../utilities/usernameGeneratetor");

const addUserValidators = [
  check("name")
    .notEmpty()
    .withMessage("Name is required. Please enter your name.")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name must have minimum 3 alphabets and maximum 31 alphabets.")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anythong other than alphabet.")
    .trim(),
  check("username")
    .notEmpty()
    .withMessage("Username is required.Please enter your username.")
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 31 })
    .withMessage(
      "Userame must have minimum 3 alphabets and maximum 31 alphabets.",
    )
    .custom(async (value, { req }) => {
      const user = await User.findOne({ username: value });
      if (user) {
        //Generate sugestions
        const base = slugifyName(req.body.name || value);
        const candidates = generateUsername(base);

        //Remove already taken usernames
        const used = await User.find({
          username: { $in: candidates },
        }).lean();

        const usedNames = new Set(used.map((u) => u.username));

        req.usernameSuggestions = candidates
          .filter((c) => !usedNames.has(c))
          .slice(0, 3);
        throw new Error("Username is already in use. Plaese try another.");
      }
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required. Please enter your email address.")
    .isEmail()
    .withMessage("Invalid email address.")
    .trim()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already in use. Plaese try another.");
      }
      return true;
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage(
      `Mobile number must be a valid Bangladeshi number. Add country code`,
    )
    .isLength({ min: 14, max: 14 })
    .withMessage("Not a valid number")
    .custom(async (value) => {
      const user = await User.findOne({ mobile: value });
      if (user) {
        throw new Error("Already exists. Use anothe one.");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Please enter your password.")
    .isLength({ min: 6 })
    .withMessage("Password must have min 6 charecters.")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 6 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol.",
    ),
];

const loginValidators = [
  check("email")
    .notEmpty()
    .withMessage("Email is required. Please enter your email address.")
    .isEmail()
    .withMessage("Invalid email address.")
    .trim(),

  check("password").notEmpty().withMessage("Please enter your password."),
];

const updatePasswordValidations = [
  check("email")
    .notEmpty()
    .withMessage("Please enter your email address.")
    .isEmail()
    .withMessage("Invalid email address.")
    .trim(),

  check("oldPassword").notEmpty().withMessage("Please enter your password."),
  check("newPassword")
    .notEmpty()
    .withMessage("Please enter your  new password.")
    .isLength({ min: 6 })
    .withMessage("New password must be minimum 6 character long.")
    .isStrongPassword()
    .withMessage(
      "New password must be at least 6 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol.",
    ),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Please enter your  old password.")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("New password and confirm password didnot match.");
      }
      return true;
    }),
];

const forgotPasswordValidations = [
  check("email")
    .notEmpty()
    .withMessage("Please enter your email address.")
    .isEmail()
    .withMessage("Invalid email address.")
    .trim(),
];

const resetPasswordValidations = [
  check("password")
    .notEmpty()
    .withMessage("Please enter your password.")
    .isLength({ min: 6 })
    .withMessage("Password must have min 6 charecters.")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 6 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol.",
    ),
];

module.exports = {
  addUserValidators,
  loginValidators,
  updatePasswordValidations,
  forgotPasswordValidations,
  resetPasswordValidations,
};
