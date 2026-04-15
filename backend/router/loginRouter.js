const express = require("express");
const {
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controller/loginController");
const {
  checkLogout,
  checkLogin,
} = require("../middlewares/authGaurd/checkLogin");
const runValidations = require("../validations/runValidations");
const {
  loginValidators,
  updatePasswordValidations,
  forgotPasswordValidations,
  resetPasswordValidations,
} = require("../validations/userValidations");
const { updatePassword } = require("../controller/usersController");
const refreshTokeGenerate = require("../middlewares/authGaurd/refreshTokenGenerate");

const loginRouter = express.Router();
//route = /api/
loginRouter.post(
  "/login",
  loginValidators,
  runValidations,
  checkLogout,
  loginUser,
);
loginRouter.post("/logout", checkLogin, logoutUser);

loginRouter.get("/check-login", refreshTokeGenerate, checkLogin, (req, res) => {
  res.status(200).json({
    msg: "checkLogin",
    success: true,
    payload: req.user, //decoded user
  });
});

loginRouter.post(
  "/forgot-pass",
  forgotPasswordValidations,
  runValidations,
  forgotPassword,
);

loginRouter.put(
  "/reset-pass",
  resetPasswordValidations,
  runValidations,
  resetPassword,
);

//loginRouter.get("/refresh-token", refreshTokeGenerate);

module.exports = loginRouter;
